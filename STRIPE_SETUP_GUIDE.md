# 🚀 STRIPE DONATION SYSTEM SETUP GUIDE
## Complete Setup for Access Global Foundation

---

## 📋 **PREREQUISITES**
- ✅ Stripe account created
- ✅ Stripe dashboard access
- ✅ Test and live API keys ready

---

## 🔑 **STEP 1: UPDATE STRIPE CONFIGURATION**

### **1.1 Update Stripe Keys**
Open `client/src/config/stripe.ts` and replace the placeholder keys:

```typescript
export const STRIPE_CONFIG = {
  // Replace these with your actual Stripe keys
  PUBLISHABLE_KEY: 'pk_test_your_actual_publishable_key_here',
  SECRET_KEY: 'sk_test_your_actual_secret_key_here',
  // ... rest of config
};
```

### **1.2 Environment Variables (Optional)**
Create a `.env.local` file in the `client` folder:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_actual_key_here
```

---

## 🏪 **STEP 2: CREATE STRIPE PRODUCTS & PRICES**

### **2.1 Create Foundation Product**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** → **Add Product**
3. **Product Name**: `Access Global Foundation Donations`
4. **Description**: `Help us launch our mission to create pathways to opportunity`
5. **Images**: Upload your foundation logo
6. **Save Product**

### **2.2 Create One-Time Donation Prices**
1. In your product, click **Add Price**
2. **Pricing Model**: Standard pricing
3. **Price**: Enter amount (e.g., $25.00)
4. **Billing**: One time
5. **Save Price**
6. **Repeat** for all donation amounts: $25, $50, $100, $250, $500, $1000, $5000

### **2.3 Create Recurring Donation Prices**
1. In your product, click **Add Price**
2. **Pricing Model**: Standard pricing
3. **Price**: Enter monthly amount (e.g., $25.00)
4. **Billing**: Recurring
5. **Billing Period**: Monthly
6. **Save Price**
7. **Repeat** for all monthly amounts: $25, $50, $100, $250, $500, $1000, $5000

### **2.4 Copy Price IDs**
After creating each price, copy the **Price ID** (starts with `price_`). You'll need these for the recurring donations.

---

## ⚙️ **STEP 3: UPDATE PRICE MAPPING**

### **3.1 Update Stripe Service**
Open `client/src/services/stripeService.ts` and update the price mapping:

```typescript
private getPriceIdForAmount(amount: number): string {
  // Replace these with your actual price IDs from Stripe dashboard
  const priceMap: Record<number, string> = {
    25: 'price_1ABC123DEF456',      // Your actual price ID for $25/month
    50: 'price_1ABC123DEF789',      // Your actual price ID for $50/month
    100: 'price_1ABC123DEF012',     // Your actual price ID for $100/month
    250: 'price_1ABC123DEF345',     // Your actual price ID for $250/month
    500: 'price_1ABC123DEF678',     // Your actual price ID for $500/month
    1000: 'price_1ABC123DEF901',    // Your actual price ID for $1000/month
    5000: 'price_1ABC123DEF234',    // Your actual price ID for $5000/month
  };
  // ... rest of method
}
```

---

## 🌐 **STEP 4: CONFIGURE WEBHOOKS (RECOMMENDED)**

### **4.1 Create Webhook Endpoint**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **Webhooks**
3. Click **Add Endpoint**
4. **Endpoint URL**: `https://yourdomain.com/api/stripe/webhook`
5. **Events to send**: Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### **4.2 Get Webhook Secret**
After creating the webhook, copy the **Signing Secret** (starts with `whsec_`).

---

## 🧪 **STEP 5: TEST THE SYSTEM**

### **5.1 Test Mode**
1. Ensure you're using **test keys** (`pk_test_` and `sk_test_`)
2. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Expiry**: Any future date
   - **CVC**: Any 3 digits

### **5.2 Test Donation Flow**
1. Go to your donation page
2. Select an amount
3. Choose Stripe as payment method
4. Enter test card details
5. Complete the donation
6. Verify redirect to success page

---

## 🚀 **STEP 6: GO LIVE**

### **6.1 Switch to Live Keys**
1. Get your **live keys** from Stripe dashboard
2. Update `client/src/config/stripe.ts`:
   ```typescript
   PUBLISHABLE_KEY: 'pk_live_your_actual_live_key_here',
   SECRET_KEY: 'sk_live_your_actual_live_key_here',
   ```

### **6.2 Update Webhook URL**
1. Go to your webhook settings
2. Update the endpoint URL to your live domain
3. Test the webhook with live events

---

## 📱 **STEP 7: CUSTOMIZE THE EXPERIENCE**

### **7.1 Update Foundation Information**
In `client/src/config/stripe.ts`:
```typescript
FOUNDATION_NAME: 'Access Global Foundation',
FOUNDATION_DESCRIPTION: 'Help us launch our mission to create pathways to opportunity',
```

### **7.2 Customize Success Page**
Edit `client/src/pages/donate-success.tsx` to match your branding and messaging.

---

## 🔒 **SECURITY CONSIDERATIONS**

### **7.1 Never Expose Secret Keys**
- ✅ **Publishable Key**: Safe to use in frontend
- ❌ **Secret Key**: Never expose in frontend code
- ✅ **Environment Variables**: Use for sensitive data

### **7.2 Webhook Verification**
- Always verify webhook signatures
- Use webhook secrets for validation
- Handle webhook failures gracefully

---

## 📊 **MONITORING & ANALYTICS**

### **8.1 Stripe Dashboard**
- Monitor donations in real-time
- View customer information
- Track subscription status
- Generate financial reports

### **8.2 Webhook Logs**
- Check webhook delivery status
- Monitor for failed webhooks
- Debug payment issues

---

## 🆘 **TROUBLESHOOTING**

### **Common Issues**

#### **1. "No price ID found for amount" Error**
- **Cause**: Price mapping not updated with actual Stripe price IDs
- **Solution**: Update the price mapping in `stripeService.ts`

#### **2. Stripe not loading**
- **Cause**: Invalid publishable key
- **Solution**: Verify your Stripe key is correct

#### **3. Checkout not redirecting**
- **Cause**: Invalid success/cancel URLs
- **Solution**: Update URLs in `stripe.ts` config

#### **4. Recurring donations not working**
- **Cause**: Invalid price IDs for recurring amounts
- **Solution**: Create recurring prices in Stripe and update mapping

---

## 📞 **SUPPORT RESOURCES**

### **Stripe Documentation**
- [Stripe Checkout](https://stripe.com/docs/checkout)
- [Stripe Elements](https://stripe.com/docs/elements)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

### **Foundation Support**
- Check the console for error messages
- Verify Stripe dashboard for payment status
- Test with Stripe's test mode first

---

## ✅ **VERIFICATION CHECKLIST**

- [ ] Stripe keys updated in config
- [ ] Products and prices created in Stripe
- [ ] Price mapping updated with actual IDs
- [ ] Test donations working
- [ ] Success page redirecting correctly
- [ ] Webhooks configured (optional)
- [ ] Live mode tested (when ready)

---

## 🎯 **NEXT STEPS**

1. **Update your Stripe keys** in the config file
2. **Create products and prices** in your Stripe dashboard
3. **Test the donation flow** with test cards
4. **Customize the success page** to match your branding
5. **Go live** when you're ready to accept real donations

---

**Your Stripe donation system is now ready! 🚀**

The system handles:
- ✅ One-time donations
- ✅ Recurring monthly donations
- ✅ Secure Stripe checkout
- ✅ Success page redirects
- ✅ Donor information collection
- ✅ Professional payment experience

Just update the configuration with your actual Stripe keys and price IDs, and you'll be ready to accept donations!
