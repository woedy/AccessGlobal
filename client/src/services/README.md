# Donation Service Configuration

This service handles communication with your Django backend for donation processing with support for multiple payment methods.

## Configuration

1. **Update API Base URL**: In `config/api.ts`, update the `BASE_URL` to point to your Django backend:
   ```typescript
   export const API_CONFIG = {
     BASE_URL: 'https://your-django-backend.com/api',
   };
   ```

2. **Environment Variable (Optional)**: You can also use environment variables by:
   - Creating a `.env.local` file in your project root
   - Adding: `NEXT_PUBLIC_API_URL=https://your-django-backend.com/api`
   - Then uncomment the line in `config/api.ts`:
   ```typescript
   BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://your-django-backend.com/api',
   ```

## Supported Payment Methods

The donation system now supports the following payment methods:

1. **Credit/Debit Card** - Direct card processing
2. **Stripe Checkout** - Redirect to Stripe's secure payment page
3. **PayPal** - Redirect to PayPal for payment
4. **Cryptocurrency** - Bitcoin, Ethereum, USDT, USDC, BNB
5. **Bank Transfer** - Direct bank account transfer
6. **Mobile Money** - MTN, Vodafone, AirtelTigo

## Django Backend Endpoints Expected

The service expects these endpoints on your Django backend:

### 1. Submit Donation
- **URL**: `POST /api/donations/`
- **Request Body**: 
  ```json
  {
    "amount": 100,
    "isMonthly": false,
    "monthlyPlan": "education",
    "paymentMethod": "card|stripe|paypal|crypto|bank|momo",
    "donorInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St"
    },
    "paymentDetails": {
      // Card payment
      "cardNumber": "1234567890123456",
      "expiryDate": "12/25",
      "cvv": "123",
      "cardholderName": "John Doe"
      
      // OR Bank transfer
      "bankName": "access",
      "accountNumber": "1234567890",
      "routingNumber": "123456789"
      
      // OR Mobile money
      "provider": "mtn",
      "phoneNumber": "0241234567"
      
      // OR Crypto
      "cryptocurrency": "bitcoin",
      "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      
      // OR Stripe/PayPal
      "email": "john@example.com"
    }
  }
  ```
- **Response**:
  ```json
  {
    "transaction_id": "AGF123456789",
    "message": "Donation processed successfully",
    "redirect_url": "https://checkout.stripe.com/..." // For Stripe/PayPal
  }
  ```

### 2. Validate Payment (Optional)
- **URL**: `POST /api/donations/validate-payment/`
- **Request Body**:
  ```json
  {
    "paymentMethod": "card",
    "paymentDetails": { ... }
  }
  ```
- **Response**:
  ```json
  {
    "valid": true,
    "message": "Payment details are valid"
  }
  ```

### 3. Get Donation History (Optional)
- **URL**: `GET /api/donations/history/?email=john@example.com`
- **Response**:
  ```json
  {
    "donations": [
      {
        "id": 1,
        "amount": 100,
        "date": "2024-01-15",
        "status": "completed",
        "paymentMethod": "card"
      }
    ]
  }
  ```

### 4. Get Crypto Rates (Optional)
- **URL**: `GET /api/crypto/rates/`
- **Response**:
  ```json
  {
    "rates": {
      "bitcoin": 45000,
      "ethereum": 3000,
      "usdt": 1,
      "usdc": 1,
      "bnb": 300
    }
  }
  ```

## Input Validation

The frontend includes comprehensive validation for all payment methods:

### Credit Card Validation
- Card number: 13-19 digits
- Expiry date: MM/YY format, must be future date
- CVV: 3-4 digits
- Cardholder name: Required

### Bank Transfer Validation
- Bank name: Required selection
- Account number: Required

### Mobile Money Validation
- Provider: Required selection
- Phone number: Minimum 10 digits

### Crypto Validation
- Cryptocurrency: Required selection
- Wallet address: 26-35 characters

### Email Validation
- Valid email format for Stripe/PayPal

## Authentication

If your Django backend requires authentication, uncomment and configure the authorization header in the `submitDonation` method:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`, // Add your auth token here
},
```

## Payment Gateway Integration

### Stripe Integration
- User provides email
- Backend creates Stripe checkout session
- Frontend redirects to Stripe checkout
- Stripe redirects back to success page

### PayPal Integration
- User provides PayPal email
- Backend creates PayPal payment
- Frontend redirects to PayPal
- PayPal redirects back to success page

### Crypto Integration
- User selects cryptocurrency and provides wallet address
- Backend calculates crypto amount based on current rates
- User sends crypto to provided address
- Backend confirms transaction

## Error Handling

The service includes comprehensive error handling and will return appropriate error messages if the Django backend is unavailable or returns errors.

## Testing

You can test the service by updating the API URL to a test endpoint or by using a mock service during development.

## Quick Setup

1. Update the URL in `client/src/config/api.ts`
2. Ensure your Django backend has the required endpoints
3. Test the donation flow with different payment methods
4. Implement proper validation on your backend

The service is now ready to work with your Django backend and supports a complete donation experience! 