// server/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const https = require('https');
const crypto = require('crypto');
const donationDB = require('./database');
const orderDB = require('./orderDatabase');
const productDB = require('./productDatabase');
const { sendDonationReceipt, sendStoreOrderReceipt } = require('./email');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const PUBLIC_BASE_URL = process.env.CLIENT_URL || process.env.PUBLIC_URL || '';
const CLIENT_ORIGIN = (process.env.CLIENT_URL || process.env.PUBLIC_URL || 'http://localhost:3000').replace(/\/$/, '');
const STORE_SHIPPING_COUNTRIES = (process.env.STORE_SHIPPING_COUNTRIES || 'US,CA,GB')
  .split(',')
  .map(code => code.trim().toUpperCase())
  .filter(Boolean);

// ---- Order matters ----
app.use(cors());

let adminKeyMissingWarningShown = false;
function requireAdminKey(req, res, next) {
  if (!ADMIN_API_KEY) {
    if (!adminKeyMissingWarningShown) {
      console.warn('ADMIN_API_KEY not set; allowing admin endpoints without authentication for development.');
      adminKeyMissingWarningShown = true;
    }
    return next();
  }

  const provided = req.headers['x-admin-key'] || req.query.adminKey || req.headers['authorization'];
  const cleaned = typeof provided === 'string' && provided.startsWith('Bearer ')
    ? provided.substring(7)
    : provided;
  if (cleaned !== ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

function resolveImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return undefined;
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }
  if (!PUBLIC_BASE_URL) {
    return undefined;
  }
  try {
    return new URL(imagePath, PUBLIC_BASE_URL).toString();
  } catch (err) {
    console.warn('Failed to resolve product image URL', imagePath, err?.message);
    return undefined;
  }
}

// Stripe webhook BEFORE express.json(), using raw body
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// NOWPayments IPN webhook BEFORE express.json(), using raw body
app.post('/api/now/ipn', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-nowpayments-sig'];
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    if (!ipnSecret) {
      console.error('NOWPayments IPN secret not configured');
      return res.status(500).send('IPN not configured');
    }

    const rawBody = req.body instanceof Buffer ? req.body.toString('utf8') : req.body;
    const computed = crypto.createHmac('sha512', ipnSecret).update(rawBody).digest('hex');
    if (!signature || signature.toLowerCase() !== computed.toLowerCase()) {
      console.warn('Invalid NOWPayments signature');
      return res.status(401).send('Invalid signature');
    }

    const payload = JSON.parse(rawBody);
    const {
      payment_id,
      payment_status,
      amount_received,
      pay_amount,
      pay_currency,
      order_id
    } = payload;

    if (!order_id) {
      console.warn('NOWPayments IPN missing order_id');
      return res.status(200).json({ ok: true });
    }

    // Map statuses: waiting/confirming/confirmed/finished/failed/expired/partially_paid/refunded
    let statusUpdate = {};
    if (payment_status === 'finished' || payment_status === 'confirmed') {
      statusUpdate = {
        status: 'completed',
        nowPaymentId: payment_id,
        nowPayAmount: pay_amount,
        nowPayCurrency: pay_currency,
        amountReceived: amount_received,
        completedAt: new Date().toISOString()
      };
    } else if (payment_status === 'partially_paid') {
      statusUpdate = {
        status: 'partial',
        nowPaymentId: payment_id,
        nowPayAmount: pay_amount,
        nowPayCurrency: pay_currency,
      };
    } else if (['failed', 'expired'].includes(payment_status)) {
      statusUpdate = { status: 'failed' };
    } else {
      statusUpdate = { status: 'pending' };
    }

    try {
      const updated = await donationDB.updateDonation(order_id, statusUpdate);

      // If completed, send receipt (guard duplicates)
      if (statusUpdate.status === 'completed') {
        const transactionId = payment_id;
        const alreadySent = Array.isArray(updated.receiptHistory) && updated.receiptHistory.some(r => r && r.transactionId === transactionId);
        if (!alreadySent) {
          try {
            const donor = updated.donorInfo || {};
            if (donor.email) {
              await sendDonationReceipt({
                to: donor.email,
                name: [donor.firstName, donor.lastName].filter(Boolean).join(' ').trim(),
                amount: Number(updated.amount || amount_received || pay_amount || 0),
                currency: (pay_currency || 'USD').toUpperCase(),
                donationId: updated.id,
                date: new Date().toISOString(),
                paymentMethod: 'Crypto (NOWPayments)',
                isMonthly: false,
                transactionId,
              });
              const history = Array.isArray(updated.receiptHistory) ? updated.receiptHistory : [];
              await donationDB.updateDonation(updated.id, {
                receiptHistory: [...history, { type: 'one_time', transactionId, sentAt: new Date().toISOString() }]
              });
            }
          } catch (e) {
            console.error('Failed to send NOWPayments receipt email:', e);
          }
        }
      }
    } catch (e) {
      console.error('Failed updating donation from NOWPayments IPN:', e);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('NOWPayments IPN handler error:', err);
    return res.status(500).send('Server error');
  }
});

// JSON parser AFTER webhook so signatures arenâ€™t broken
app.use(express.json());

// ---- Static files ----
// Support any of these build locations:
// - server/public           (our copy target during build)
// - repo root /dist         (Vite outDir: '../dist')
// - client/dist             (default Vite)
// - client/build            (CRA)
const candidates = [
  path.join(__dirname, 'public'),
  path.join(__dirname, '..', 'dist'),
  path.join(__dirname, '..', 'client', 'dist'),
  path.join(__dirname, '..', 'client', 'build')
];

const staticRoot =
  candidates.find(p => fs.existsSync(path.join(p, 'index.html'))) || candidates[0];

console.log(
  'Static root ->',
  staticRoot,
  'index.html exists?',
  fs.existsSync(path.join(staticRoot, 'index.html'))
);

// Serve static assets (only does something if folder exists)
app.use(express.static(staticRoot));

// ====== API ROUTES ======

// Create NOWPayments invoice and donation intent
app.post('/api/now/create-invoice', async (req, res) => {
  try {
    const { amount, donorInfo, message, isPublic } = req.body || {};
    if (!process.env.NOWPAYMENTS_API_KEY) {
      console.error('Missing NOWPAYMENTS_API_KEY in env');
      return res.status(500).json({ error: 'NOWPayments not configured.' });
    }
    if (!amount || !donorInfo || !donorInfo.email) {
      return res.status(400).json({ error: 'Missing amount or donor email' });
    }

    // Create donation intent in DB first
    const donationIntent = await donationDB.addDonation({
      amount,
      isMonthly: false,
      donorInfo,
      message: message || '',
      isPublic: isPublic !== false,
      status: 'pending',
      provider: 'nowpayments',
      nowInvoiceId: null,
      nowPaymentId: null
    });

    const ipnUrl = process.env.NOWPAYMENTS_IPN_URL || `${req.protocol}://${req.get('host')}/api/now/ipn`;
    const successUrl = process.env.SUCCESS_URL || `${req.protocol}://${req.get('host')}/donate-success`;
    const cancelUrl = process.env.CANCEL_URL || `${req.protocol}://${req.get('host')}/donate`;

    const payload = JSON.stringify({
      price_amount: Number(amount),
      price_currency: 'USD',
      order_id: donationIntent.id,
      ipn_callback_url: ipnUrl,
      success_url: successUrl,
      cancel_url: cancelUrl,
      is_fee_paid_by_user: true,
      // customer email helps users retrieve invoice later
      customer_email: donorInfo.email
    });

    const options = {
      hostname: 'api.nowpayments.io',
      path: '/v1/invoice',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const responseBody = await new Promise((resolve, reject) => {
      const reqHttps = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => (data += chunk));
        resp.on('end', () => resolve({ statusCode: resp.statusCode, body: data }));
      });
      reqHttps.on('error', reject);
      reqHttps.write(payload);
      reqHttps.end();
    });

    const { statusCode, body } = responseBody;
    let parsed;
    try { parsed = JSON.parse(body); } catch (e) { parsed = {}; }

    if (statusCode < 200 || statusCode >= 300) {
      console.error('NOWPayments error:', statusCode, body);
      return res.status(502).json({ error: 'Failed to create invoice', details: parsed || body });
    }

    // Update donation with invoice id
    try {
      await donationDB.updateDonation(donationIntent.id, {
        nowInvoiceId: parsed?.id || parsed?.invoice_id || null,
        nowInvoiceUrl: parsed?.invoice_url || parsed?.url || null
      });
    } catch (e) {
      console.error('Failed to store NOW invoice details:', e);
    }

    return res.json({
      success: true,
      donationId: donationIntent.id,
      invoiceId: parsed?.id || parsed?.invoice_id,
      url: parsed?.invoice_url || parsed?.url
    });
  } catch (err) {
    console.error('NOWPayments invoice creation error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, isMonthly, donorInfo, metadata, message, isPublic } = req.body;
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY in env');
      return res.status(500).json({ error: 'Stripe secret key not configured.' });
    }
    if (!amount || !donorInfo || !donorInfo.email) {
      console.error('Missing required donation fields:', { amount, donorInfo });
      return res.status(400).json({ error: 'Missing required donation fields.' });
    }

    // Store donation intent in database
    const donationIntent = await donationDB.addDonation({
      amount,
      isMonthly,
      donorInfo,
      message: message || '',
      isPublic: isPublic !== false, // default to public
      status: 'pending',
      stripeSessionId: null,
      metadata
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Access Global Foundation Donation',
              description: isMonthly ? 'Monthly Donation' : 'One-Time Donation'
            },
            unit_amount: Math.round(amount * 100),
            recurring: isMonthly ? { interval: 'month' } : undefined
          },
          quantity: 1
        }
      ],
      mode: isMonthly ? 'subscription' : 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
      customer_email: donorInfo?.email,
      metadata: {
        donationId: donationIntent.id,
        foundation: 'Access Global Foundation',
        donation_type: isMonthly ? 'recurring' : 'one_time',
        message: message || '',
        isPublic: isPublic !== false ? 'true' : 'false'
      }
    });

    await donationDB.updateDonation(donationIntent.id, { stripeSessionId: session.id });
    res.json({ url: session.url, donationId: donationIntent.id, sessionId: session.id });
  } catch (err) {
    console.error('Stripe session creation error:', err);
    res.status(500).json({ error: err.message, details: err });
  }
});

// Get donation by Stripe session ID
app.get('/api/donations/session/:sessionId', async (req, res) => {
  try {
    const donations = await donationDB.getAllDonations();
    const donation = donations.find(d => d.stripeSessionId === req.params.sessionId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.json(donation);
  } catch (error) {
    console.error('Failed to get donation by session ID:', error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// Get all public donations
app.get('/api/donations/public', async (req, res) => {
  try {
    const includeAnonymous = req.query.includeAnonymous === 'true';
    const donations = await donationDB.getPublicDonations(includeAnonymous);
    res.json(donations);
  } catch (error) {
    console.error('Failed to get public donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Get donation by ID
app.get('/api/donations/:id', async (req, res) => {
  try {
    const donation = await donationDB.getDonation(req.params.id);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.json(donation);
  } catch (error) {
    console.error('Failed to get donation:', error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// Get donations by email
app.get('/api/donations/by-email/:email', async (req, res) => {
  try {
    const donations = await donationDB.getDonationsByEmail(req.params.email);
    res.json(donations);
  } catch (error) {
    console.error('Failed to get donations by email:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Update donation
app.put('/api/donations/:id', async (req, res) => {
  try {
    const { message, isPublic } = req.body;
    const updates = {};
    if (message !== undefined) updates.message = message;
    if (isPublic !== undefined) updates.isPublic = isPublic;
    const donation = await donationDB.updateDonation(req.params.id, updates);
    res.json(donation);
  } catch (error) {
    console.error('Failed to update donation:', error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

// Delete donation
app.delete('/api/donations/:id', async (req, res) => {
  try {
    await donationDB.deleteDonation(req.params.id);
    res.json({ success: true, message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Failed to delete donation:', error);
    res.status(500).json({ error: 'Failed to delete donation' });
  }
});

// ===== Store Checkout =====
app.post('/api/store/checkout', async (req, res) => {
  try {
    const { items, successUrl, cancelUrl, customer } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    const stripeLineItems = [];
    const summaryItems = [];
    let subtotal = 0;

    for (const rawItem of items) {
      const productId = rawItem && rawItem.productId ? String(rawItem.productId).trim() : '';
      const slug = rawItem && rawItem.slug ? String(rawItem.slug).trim() : '';
      const quantity = Number(rawItem.quantity || 0);

      if ((!productId && !slug) || !Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid cart item' });
      }

      let product = productId ? await productDB.getProductById(productId) : null;
      if (!product && slug) {
        product = await productDB.getProductBySlug(slug);
      }

      if (!product) {
        return res.status(404).json({ error: `Product not found (${productId || slug})` });
      }

      if (product.inStock === false) {
        return res.status(400).json({ error: `${product.name} is currently out of stock` });
      }

      const variantId = rawItem.variantId || rawItem.selectedVariantId || null;
      const variant = Array.isArray(product.variants)
        ? product.variants.find(v => v.id === variantId)
        : null;

      if (variant && variant.stock !== undefined && quantity > variant.stock) {
        return res.status(400).json({ error: `Only ${variant.stock} left for ${variant.name}` });
      }

      if (!variant && product.stock !== undefined && quantity > product.stock) {
        return res.status(400).json({ error: `Only ${product.stock} left for ${product.name}` });
      }

      const unitPrice = Number(
        variant && variant.price !== undefined ? variant.price : product.price
      );

      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return res.status(400).json({ error: `Invalid price for product ${product.name}` });
      }

      const displayName = variant ? `${product.name} (${variant.name})` : product.name;
      const lineDescription = variant && product.description
        ? `${product.description} - Variant: ${variant.name}`
        : product.description || undefined;
      const imageUrl = resolveImageUrl((variant && variant.image) || (product.images && product.images[0]));

      subtotal += unitPrice * quantity;

      const productData = {
        name: displayName,
      };
      if (lineDescription) {
        productData.description = lineDescription;
      }
      if (imageUrl) {
        productData.images = [imageUrl];
      }

      const metadata = {
        productId: product.id,
      };
      if (variant && variant.id) {
        metadata.variantId = variant.id;
      }
      productData.metadata = metadata;

      stripeLineItems.push({
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity,
      });

      summaryItems.push({
        productId: product.id,
        productName: product.name,
        variantId: variant ? variant.id : null,
        variantName: variant ? variant.name : null,
        quantity,
        unitPrice,
        lineTotal: Number((unitPrice * quantity).toFixed(2)),
        image: (variant && variant.image) || (product.images && product.images[0]) || null,
        sku: (variant && variant.sku) || product.sku || null,
      });
    }

    const orderTotal = Number(subtotal.toFixed(2));
    const safeCustomer = customer && typeof customer === 'object'
      ? {
          name: customer.name ? String(customer.name).trim() : null,
          email: customer.email ? String(customer.email).trim() : null,
          phone: customer.phone ? String(customer.phone).trim() : null,
          notes: customer.notes ? String(customer.notes).trim() : null,
        }
      : { name: null, email: null, phone: null, notes: null };

    const order = await orderDB.createOrder({
      items: stripeLineItems,
      summary: {
        items: summaryItems,
        subtotal: orderTotal,
        notes: safeCustomer.notes || null,
      },
      status: 'pending',
      currency: 'usd',
      total: orderTotal,
      customer: safeCustomer,
      deliveryStatus: 'pending',
      notes: safeCustomer.notes || null,
    });

    const shippingCountries = STORE_SHIPPING_COUNTRIES.length
      ? STORE_SHIPPING_COUNTRIES
      : ['US'];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: stripeLineItems,
      success_url: successUrl || `${CLIENT_ORIGIN}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${CLIENT_ORIGIN}/cart`,
      metadata: {
        orderId: order.id,
        type: 'store_order',
      },
      client_reference_id: order.id,
      customer_email: safeCustomer.email || undefined,
      shipping_address_collection: {
        allowed_countries: shippingCountries,
      },
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
    });

    await orderDB.updateOrder(order.id, {
      stripeSessionId: session.id,
      checkoutUrl: session.url || null,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Store checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
// ===== Store Catalog =====
app.get('/api/store/products', async (req, res) => {
  try {
    const products = await productDB.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/store/products/slug/:slug', async (req, res) => {
  try {
    const product = await productDB.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Failed to fetch product by slug:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/api/store/products/:id', async (req, res) => {
  try {
    const product = await productDB.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/store/products', requireAdminKey, async (req, res) => {
  try {
    const product = await productDB.createProduct(req.body || {});
    res.status(201).json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    res.status(error.message && error.message.includes('exists') ? 409 : 400).json({ error: error.message || 'Failed to create product' });
  }
});

app.put('/api/store/products/:id', requireAdminKey, async (req, res) => {
  try {
    const product = await productDB.updateProduct(req.params.id, req.body || {});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    res.status(error.message && error.message.includes('exists') ? 409 : 400).json({ error: error.message || 'Failed to update product' });
  }
});

app.delete('/api/store/products/:id', requireAdminKey, async (req, res) => {
  try {
    const removed = await productDB.deleteProduct(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ===== Store Orders (Admin) =====
app.get('/api/store/orders', requireAdminKey, async (req, res) => {
  try {
    const orders = await orderDB.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/store/orders/:id', requireAdminKey, async (req, res) => {
  try {
    const order = await orderDB.getOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.patch('/api/store/orders/:id', requireAdminKey, async (req, res) => {
  try {
    const updates = {};
    const payload = req.body || {};

    if (payload.status) {
      updates.status = payload.status;
    }
    if (payload.deliveryStatus) {
      updates.deliveryStatus = payload.deliveryStatus;
    }
    if (payload.notes !== undefined) {
      updates.notes = payload.notes;
    }
    if (payload.delivery) {
      updates.delivery = {
        ...(payload.delivery || {}),
      };
    }
    if (payload.customer) {
      updates.customer = payload.customer;
    }
    if (Array.isArray(payload.fulfillmentHistory)) {
      updates.fulfillmentHistory = payload.fulfillmentHistory;
    }
    if (Array.isArray(payload.emailHistory)) {
      updates.emailHistory = payload.emailHistory;
    }
    if (payload.metadata) {
      updates.metadata = payload.metadata;
    }

    const order = await orderDB.updateOrder(req.params.id, updates);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Failed to update order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});
// Health check
// Order lookup by Stripe session id
app.get('/api/orders/session/:sessionId', async (req, res) => {
  try {
    const order = await orderDB.getOrderByStripeSession(req.params.sessionId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (e) {
    console.error('Failed to fetch order by session:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ---- SPA fallback (AFTER all /api routes) ----
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ===== handlers =====
async function handleCheckoutCompleted(session) {
  // Handle store orders
  if (session?.metadata?.type === 'store_order') {
    try {
      const amountTotal = (session.amount_total ?? 0) / 100;
      const amountSubtotal = session.amount_subtotal !== undefined ? (session.amount_subtotal / 100) : undefined;
      const orderId = session.metadata.orderId;

      let orderRecord = null;
      if (orderId) {
        orderRecord = await orderDB.getOrder(orderId);
      }
      if (!orderRecord && session.id) {
        orderRecord = await orderDB.getOrderByStripeSession(session.id);
      }

      if (!orderRecord) {
        console.warn('Store order webhook received for unknown order', session.id);
        return;
      }

      const summaryItems = Array.isArray(orderRecord.summary?.items) && orderRecord.summary.items.length
        ? orderRecord.summary.items
        : Array.isArray(orderRecord.items) ? orderRecord.items : [];

      const customerEmail = session?.customer_details?.email || orderRecord?.customer?.email || null;
      const customerName = session?.customer_details?.name || orderRecord?.customer?.name || null;
      const customerPhone = session?.customer_details?.phone || orderRecord?.customer?.phone || null;

      const updatePayload = {
        status: 'completed',
        deliveryStatus: orderRecord.deliveryStatus === 'pending' ? 'processing' : orderRecord.deliveryStatus || 'processing',
        stripeCustomerId: session.customer,
        paymentIntentId: session.payment_intent || null,
        amount_total: amountTotal,
        total: amountTotal,
        currency: (session.currency || 'usd').toUpperCase(),
        summary: {
          items: summaryItems,
          subtotal: amountSubtotal !== undefined ? amountSubtotal : (orderRecord.summary?.subtotal || amountTotal),
          notes: orderRecord.summary?.notes ?? orderRecord.notes ?? null,
        },
        shipping_details: session.shipping_details || null,
        customer_details: session.customer_details || null,
        completedAt: new Date().toISOString(),
      };

      if (customerEmail || customerName || customerPhone) {
        updatePayload.customer = {
          ...(orderRecord.customer || {}),
          email: customerEmail || orderRecord.customer?.email || null,
          name: customerName || orderRecord.customer?.name || null,
          phone: customerPhone || orderRecord.customer?.phone || null,
        };
      }

      const updatedOrder = await orderDB.updateOrder(orderRecord.id, updatePayload);

      if (customerEmail && updatedOrder) {
        const history = Array.isArray(updatedOrder.emailHistory) ? updatedOrder.emailHistory : [];
        const alreadySent = history.some(entry => entry && entry.sessionId === session.id && entry.type === 'order_confirmation');

        if (!alreadySent) {
          try {
            await sendStoreOrderReceipt({ to: customerEmail, order: updatedOrder });
            await orderDB.updateOrder(updatedOrder.id, {
              emailHistory: [...history, { type: 'order_confirmation', sessionId: session.id, sentAt: new Date().toISOString() }]
            });
          } catch (emailError) {
            console.error('Failed to send store order receipt email:', emailError);
          }
        }
      }
    } catch (e) {
      console.error('Failed to finalize store order:', e);
    }
    return;
  }

  const donationId = session.metadata?.donationId;
  if (!donationId) {
    console.error('No donation ID found in session metadata');
    return;
  }
  try {
    const updated = await donationDB.updateDonation(donationId, {
      status: 'completed',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      completedAt: new Date().toISOString()
    });
    console.log(`Donation ${donationId} marked as completed`);

    // Avoid duplicate receipts if webhook retries
    const transactionId = session.id || session.payment_intent || session.subscription || session.client_reference_id;
    const alreadySent = Array.isArray(updated.receiptHistory) && updated.receiptHistory.some(r => r && r.transactionId === transactionId);

    if (!alreadySent) {
      try {
        const donor = updated.donorInfo || {};
        if (donor.email) {
          await sendDonationReceipt({
            to: donor.email,
            name: [donor.firstName, donor.lastName].filter(Boolean).join(' ').trim(),
            amount: updated.amount,
            currency: 'USD',
            donationId: updated.id,
            date: new Date().toISOString(),
            paymentMethod: 'Stripe',
            isMonthly: !!updated.isMonthly,
            transactionId,
          });
          const history = Array.isArray(updated.receiptHistory) ? updated.receiptHistory : [];
          await donationDB.updateDonation(donationId, {
            receiptHistory: [...history, { type: updated.isMonthly ? 'recurring_initial' : 'one_time', transactionId, sentAt: new Date().toISOString() }]
          });
        } else {
          console.warn('Donor email missing; cannot send receipt');
        }
      } catch (e) {
        console.error('Failed to send Stripe receipt email:', e);
      }
    }
  } catch (error) {
    console.error(`Failed to update donation ${donationId}:`, error);
  }
}

async function handleInvoicePaymentSucceeded(invoice) {
  if (!invoice.subscription) return;
  try {
    const donations = await donationDB.getAllDonations();
    const donation = donations.find(d => d.stripeSubscriptionId === invoice.subscription);
    if (donation) {
      const recurringPayment = {
        id: invoice.id,
        amount: invoice.amount_paid / 100,
        date: new Date(invoice.created * 1000).toISOString(),
        status: 'succeeded'
      };
      const existingPayments = donation.recurringPayments || [];
      existingPayments.push(recurringPayment);
      const updated = await donationDB.updateDonation(donation.id, {
        recurringPayments: existingPayments,
        lastPaymentDate: new Date().toISOString()
      });
      console.log(`Recurring payment recorded for donation ${donation.id}`);

      // Send recurring receipt, guard against duplicates
      const transactionId = invoice.id;
      const alreadySent = Array.isArray(updated.receiptHistory) && updated.receiptHistory.some(r => r && r.transactionId === transactionId);
      if (!alreadySent) {
        try {
          const donor = updated.donorInfo || {};
          if (donor.email) {
            await sendDonationReceipt({
              to: donor.email,
              name: [donor.firstName, donor.lastName].filter(Boolean).join(' ').trim(),
              amount: invoice.amount_paid / 100,
              currency: (invoice.currency || 'usd').toUpperCase(),
              donationId: updated.id,
              date: new Date(invoice.created * 1000).toISOString(),
              paymentMethod: 'Stripe (Subscription)',
              isMonthly: true,
              transactionId,
            });
            const history = Array.isArray(updated.receiptHistory) ? updated.receiptHistory : [];
            await donationDB.updateDonation(updated.id, {
              receiptHistory: [...history, { type: 'recurring_cycle', transactionId, sentAt: new Date().toISOString() }]
            });
          }
        } catch (e) {
          console.error('Failed to send recurring receipt email:', e);
        }
      }
    }
  } catch (error) {
    console.error('Failed to handle recurring payment:', error);
  }
}

async function handleSubscriptionDeleted(subscription) {
  try {
    const donations = await donationDB.getAllDonations();
    const donation = donations.find(d => d.stripeSubscriptionId === subscription.id);
    if (donation) {
      await donationDB.updateDonation(donation.id, {
        status: 'cancelled',
        cancelledAt: new Date().toISOString()
      });
      console.log(`Subscription cancelled for donation ${donation.id}`);
    }
  } catch (error) {
    console.error('Failed to handle subscription cancellation:', error);
  }
}










