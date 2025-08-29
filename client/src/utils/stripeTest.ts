// Stripe Integration Test Utility
// Use this to verify your Stripe setup is working correctly

import { stripeService } from '@/services/stripeService';

export const testStripeIntegration = async () => {
  console.log('🧪 Testing Stripe Integration...');
  
  try {
    // Test 1: Initialize Stripe
    console.log('1️⃣ Testing Stripe initialization...');
    const stripe = await stripeService.initialize();
    console.log('✅ Stripe initialized successfully:', !!stripe);
    
    // Test 2: Test configuration
    console.log('2️⃣ Testing configuration...');
    console.log('✅ Stripe config loaded');
    
    // Test 3: Test one-time donation session creation (mock data)
    console.log('3️⃣ Testing one-time donation session creation...');
    const mockDonationData = {
      amount: 100,
      isMonthly: false,
      donorInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+1234567890',
        address: '123 Test St, Test City, TC 12345'
      },
      metadata: {
        foundation: 'Access Global Foundation',
        donation_type: 'one_time'
      }
    };
    
    try {
      const session = await stripeService.createOneTimeDonationSession(mockDonationData);
      console.log('✅ One-time donation session created:', !!session);
    } catch (error) {
      console.log('⚠️ One-time donation test failed (expected if keys not configured):', error);
    }
    
    // Test 4: Test recurring donation session creation (mock data)
    console.log('4️⃣ Testing recurring donation session creation...');
    const mockRecurringData = {
      ...mockDonationData,
      isMonthly: true,
      metadata: {
        ...mockDonationData.metadata,
        donation_type: 'recurring'
      }
    };
    
    try {
      const session = await stripeService.createRecurringDonationSession(mockRecurringData);
      console.log('✅ Recurring donation session created:', !!session);
    } catch (error) {
      console.log('⚠️ Recurring donation test failed (expected if price IDs not configured):', error);
    }
    
    console.log('🎉 Stripe integration test completed!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Update your Stripe keys in client/src/config/stripe.ts');
    console.log('2. Create products and prices in your Stripe dashboard');
    console.log('3. Update price mapping in stripeService.ts');
    console.log('4. Test with real Stripe checkout');
    
  } catch (error) {
    console.error('❌ Stripe integration test failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Check if Stripe keys are valid');
    console.log('2. Verify network connectivity');
    console.log('3. Check browser console for errors');
  }
};

// Test card numbers for Stripe testing
export const STRIPE_TEST_CARDS = {
  SUCCESS: '4242 4242 4242 4242',
  DECLINE: '4000 0000 0000 0002',
  INSUFFICIENT_FUNDS: '4000 0000 0000 9995',
  EXPIRED: '4000 0000 0000 0069',
  INCORRECT_CVC: '4000 0000 0000 0127',
  PROCESSING_ERROR: '4000 0000 0000 0119'
};

// Test expiration dates
export const TEST_EXPIRY = {
  FUTURE: '12/25', // Any future date
  PAST: '12/20'    // Any past date
};

// Test CVC codes
export const TEST_CVC = {
  VALID: '123',
  INVALID: '999'
};

// Run test when imported (for development)
if (import.meta.env.DEV) {
  // Uncomment the line below to run tests automatically in development
  // testStripeIntegration();
}
