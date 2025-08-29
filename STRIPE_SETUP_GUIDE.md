# 🚀 STRIPE DONATION SYSTEM SETUP GUIDE
## Complete Setup for Access Global Foundation

---

## 📋 **PREREQUISITES**
- ✅ Stripe account created
- ✅ Stripe dashboard access
- ✅ Test and live API keys ready

---

## 🔑 **STEP 1: UPDATE STRIPE CONFIGURATION**

### **1.1 Update Stripe Keys (Environment Variables)**
**Backend:**
Open `server/.env` and add your Stripe secret key:
```env
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

**Frontend:**
Open `client/.env` and add your publishable key and backend URL:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
VITE_BACKEND_URL=http://localhost:3001
```

---

## 🏪 **STEP 2: CREATE STRIPE PRODUCTS & PRICES (OPTIONAL)**

For one-time donations, the backend supports custom amounts. For recurring donations, you may want to create products and prices in Stripe:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create products and prices as needed for recurring donations.
3. Copy the price IDs for use in your frontend mapping.

---

## ⚙️ **STEP 3: UPDATE PRICE MAPPING (RECURRING ONLY)**

If you use recurring donations, update the price mapping in `client/src/services/stripeService.ts` with your actual price IDs.

---

## 🌐 **STEP 4: CONFIGURE WEBHOOKS (RECOMMENDED)**

Configure your backend webhook endpoint in `server/index.js` and set your webhook secret in `server/.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```
Add the endpoint in Stripe dashboard as described above.

---

## 🧪 **STEP 5: TEST THE SYSTEM**

### **5.1 Test Mode**
1. Ensure you're using **test keys** (`pk_test_` and `sk_test_`)
2. Use Stripe's test card numbers:
  - **Success**: `4242 4242 4242 4242`
  - **Decline**: `4000 0000 0000 0002`
  - **Expiry**: Any future date
  - **CVC**: Any 3 digits
3. Run both backend and frontend locally and test the donation flow.

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
2. Update `server/.env` and `client/.env` with your live keys:
  ```env
  # server/.env
  STRIPE_SECRET_KEY=sk_live_your_actual_live_key_here
  # client/.env
  VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_key_here
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
- ✅ **Environment Variables**: Use for sensitive data (backend and frontend)

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

- [ ] Stripe keys updated in `.env` files
- [ ] Backend server running and connected
- [ ] Products and prices created in Stripe (recurring only)
- [ ] Price mapping updated with actual IDs (recurring only)
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

Just update the configuration with your actual Stripe keys and price IDs, run both backend and frontend, and you'll be ready to accept donations!
