// server/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const donationDB = require('./database');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ---- Middleware order matters ----
// 1) CORS
app.use(cors());

// 2) Stripe webhook BEFORE express.json(), using raw body
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

// 3) JSON parser AFTER webhook so signatures aren’t broken
app.use(express.json());

// ---- Static files ----
// Pick the first folder that actually contains index.html
const candidates = [
  path.join(__dirname, 'public'),                  // server/public (what we copy into in build phase)
  path.join(__dirname, '..', 'client', 'dist'),    // Vite build (fallback if copy failed)
  path.join(__dirname, '..', 'client', 'build')    // CRA build (fallback if copy failed)
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

// ---- API ROUTES ----

// Create Stripe Checkout Session with named donation support
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

    // Update donation with Stripe session ID
    await donationDB.updateDonation(donationIntent.id, {
      stripeSessionId: session.id
    });

    res.json({ url: session.url, donationId: donationIntent.id });
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

// Get all public donations (for display on website)
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

// Get donations by email (for donor history)
app.get('/api/donations/by-email/:email', async (req, res) => {
  try {
    const donations = await donationDB.getDonationsByEmail(req.params.email);
    res.json(donations);
  } catch (error) {
    console.error('Failed to get donations by email:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Update donation (admin)
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

// Delete donation (admin)
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
    await donationDB.updateDonation(donationId, {
      status: 'completed',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      completedAt: new Date().toISOString()
    });
    console.log(`Donation ${donationId} marked as completed`);
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
      await donationDB.updateDonation(donation.id, {
        recurringPayments: existingPayments,
        lastPaymentDate: new Date().toISOString()
      });
      console.log(`Recurring payment recorded for donation ${donation.id}`);
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
