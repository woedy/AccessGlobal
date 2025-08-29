# Donation Service - Stripe Integration

## Overview
This donation service implements Stripe hosted checkout for the Access Global Foundation static website. It allows donors to make secure payments without requiring a backend server.

## Features
- **Stripe Hosted Checkout**: Secure payment processing through Stripe's hosted solution
- **PayPal Integration**: Direct redirect to PayPal for donations
- **Multiple Payment Methods**: Support for various payment options
- **Static Site Compatible**: No backend server required

## Setup Instructions

### 1. Stripe Configuration
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe Dashboard
3. Update the `stripePublishableKey` in `donationService.ts`:

```typescript
private stripePublishableKey = 'pk_test_your_actual_key_here';
```

### 2. Stripe Checkout Session Creation
The current implementation includes a mock checkout session. In production, you'll need to:

1. **Option A: Use Stripe CLI for testing**
   ```bash
   stripe listen --forward-to localhost:3000/api/create-checkout-session
   ```

2. **Option B: Use a serverless function (Vercel/Netlify)**
   Create an API route that creates Stripe checkout sessions

3. **Option C: Use Stripe's client-only checkout**
   Implement Stripe Elements for direct card processing

### 3. Environment Variables
Create a `.env.local` file in your project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Payment Flow

### Stripe Payments
1. User selects donation amount
2. User chooses Stripe as payment method
3. User enters email address
4. System redirects to Stripe hosted checkout
5. User completes payment on Stripe
6. Stripe redirects back to success page

### PayPal Payments
1. User selects donation amount
2. User chooses PayPal as payment method
3. User enters email address
4. System redirects to PayPal
5. User completes payment on PayPal
6. PayPal redirects back to success page

## Security Considerations

### What's Secure
- ✅ Stripe hosted checkout (PCI compliant)
- ✅ No sensitive data stored on your server
- ✅ Stripe handles all payment processing
- ✅ HTTPS required for production

### What to Avoid
- ❌ Never store credit card numbers
- ❌ Never handle raw payment data
- ❌ Don't bypass Stripe's security measures

## Testing

### Stripe Test Mode
- Use test card numbers: `4242 4242 4242 4242`
- Use test expiry: Any future date
- Use test CVC: Any 3 digits

### PayPal Sandbox
- Use PayPal sandbox accounts for testing
- Test with small amounts only

## Production Deployment

### 1. Update Keys
- Change from test keys to live keys
- Update success/cancel URLs to production domain

### 2. SSL Certificate
- Ensure HTTPS is enabled
- Valid SSL certificate required

### 3. Webhook Setup (Recommended)
- Set up Stripe webhooks for payment confirmations
- Handle successful payments server-side

## Troubleshooting

### Common Issues

1. **Stripe not loading**
   - Check internet connection
   - Verify publishable key is correct
   - Check browser console for errors

2. **Payment not processing**
   - Verify Stripe account is active
   - Check Stripe Dashboard for errors
   - Ensure test mode is enabled for testing

3. **Redirect issues**
   - Verify success/cancel URLs are correct
   - Check domain configuration in Stripe

### Debug Mode
Enable debug logging by adding to your browser console:

```javascript
localStorage.setItem('debug', 'stripe:*');
```

## Support

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **PayPal Developer**: [developer.paypal.com](https://developer.paypal.com)

## Notes for Access Global Foundation

This implementation follows the PIVOT PLAN requirements:
- ✅ Maintains all existing donation tiers and amounts
- ✅ Implements Stripe hosted checkout for secure payments
- ✅ No backend/server implementation needed
- ✅ Static site compatible
- ✅ Reflects new foundation messaging

Remember to update the Stripe publishable key and PayPal business email before going live! 