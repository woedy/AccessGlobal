# Local Testing Setup for Named Donations

This guide will help you set up and test the named donations feature locally before deploying to production.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stripe account (for testing)
- Git

## Step 1: Install Dependencies

### Server Dependencies
```bash
cd server
npm install
```

### Client Dependencies
```bash
cd client
npm install
```

## Step 2: Environment Configuration

### Server Environment
1. Copy the example environment file:
```bash
cd server
cp env.example .env
```

2. Edit `.env` with your Stripe test keys:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# URLs for Stripe Checkout
SUCCESS_URL=http://localhost:5173/donate-success
CANCEL_URL=http://localhost:5173/donate

# Server Configuration
PORT=3002
NODE_ENV=development
```

### Client Environment
1. Create `.env.local` in the client directory:
```bash
cd client
touch .env.local
```

2. Add the backend URL:
```env
VITE_BACKEND_URL=http://localhost:3002
```

## Step 3: Stripe Test Setup

### 1. Get Test API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Switch to "Test mode" (toggle in top right)
3. Go to Developers → API keys
4. Copy your "Publishable key" and "Secret key"

### 2. Set Up Webhook Endpoint
1. In Stripe Dashboard, go to Developers → Webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `http://localhost:3002/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret

### 3. Update Environment Files
Update your server `.env` file with the actual keys:
```env
STRIPE_SECRET_KEY=sk_test_...your_actual_test_key...
STRIPE_WEBHOOK_SECRET=whsec_...your_actual_webhook_secret...
```

## Step 4: Start the Services

### Terminal 1: Start Server
```bash
cd server
npm run dev
```

The server should start on port 3002.

### Terminal 2: Start Client
```bash
cd client
npm run dev
```

The client should start on port 5173.

## Step 5: Test the Named Donations

### 1. Test Donation Flow
1. Open http://localhost:5173/donate
2. Select an amount
3. Choose Stripe as payment method
4. Fill in donor information
5. **NEW**: Add a personal message and choose privacy settings
6. Complete the donation

### 2. Test Stripe Checkout
1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any name and address

### 3. Verify Webhook Processing
Check your server console for webhook events:
```
Donation [id] marked as completed
```

### 4. Test Donation Wall
1. Go to a page with the donation wall component
2. Verify donations appear with names/messages
3. Test anonymous donations

## Step 6: Database Verification

### Check Local Database
The server creates a `donations.json` file. Check its contents:
```bash
cd server
cat donations.json
```

You should see your test donations with all the metadata.

### API Endpoints Testing
Test the new API endpoints:

```bash
# Get public donations
curl http://localhost:3002/api/donations/public

# Get donation by ID
curl http://localhost:3002/api/donations/[donation_id]

# Health check
curl http://localhost:3002/api/health
```

## Step 7: Troubleshooting

### Common Issues

#### 1. CORS Errors
- Ensure server is running on port 3002
- Check that CORS is properly configured in server/index.js

#### 2. Stripe Webhook Failures
- Verify webhook secret in .env
- Check webhook endpoint URL in Stripe dashboard
- Ensure server is accessible from internet (use ngrok for local testing)

#### 3. Database Errors
- Check file permissions for donations.json
- Ensure uuid package is installed
- Verify database.js is properly imported

#### 4. Client-Server Communication
- Verify VITE_BACKEND_URL is set correctly
- Check network tab for failed requests
- Ensure both services are running

### Using ngrok for Webhook Testing
If you need to test webhooks locally:

1. Install ngrok: `npm install -g ngrok`
2. Start your server: `npm run dev`
3. In another terminal: `ngrok http 3002`
4. Use the ngrok URL in your Stripe webhook endpoint
5. Update your .env with the ngrok URL

## Step 8: Production Preparation

### Environment Variables
Update environment variables for production:
```env
NODE_ENV=production
SUCCESS_URL=https://yourdomain.com/donate-success
CANCEL_URL=https://yourdomain.com/donate
```

### Database
For production, consider:
- PostgreSQL or MongoDB instead of JSON file
- Proper backup strategies
- Data migration scripts

### Security
- Use environment variables for all secrets
- Implement rate limiting
- Add request validation
- Use HTTPS in production

## Next Steps

1. Test all donation scenarios (one-time, recurring, anonymous)
2. Verify webhook handling for all event types
3. Test donation wall display
4. Implement admin features for managing donations
5. Add email notifications
6. Set up monitoring and logging

## Support

If you encounter issues:
1. Check the server console for errors
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check Stripe dashboard for webhook delivery status
