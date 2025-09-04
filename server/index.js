// server/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const https = require('https');
const crypto = require('crypto');
const donationDB = require('./database');
const { sendDonationReceipt } = require('./email');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ---- Order matters ----
app.use(cors());

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

// JSON parser AFTER webhook so signatures aren’t broken
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

// Health check
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
