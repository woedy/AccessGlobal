import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '@/config/stripe';

// Types for Stripe operations
export interface StripeDonationData {
  amount: number;
  isMonthly: boolean;
  monthlyPlan?: string;
  donorInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  metadata?: Record<string, string>;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
  amount_total: number;
  currency: string;
  mode: 'payment' | 'subscription';
  status: string;
}

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface StripeSubscription {
  id: string;
  status: string;
  current_period_end: number;
  items: {
    data: Array<{
      price: {
        id: string;
        unit_amount: number;
        currency: string;
        recurring: {
          interval: string;
        };
      };
    }>;
  };
}

class StripeService {
  private stripe: Stripe | null = null;
  private isInitialized = false;

  /**
   * Initialize Stripe
   */
  async initialize(): Promise<Stripe> {
    if (this.stripe && this.isInitialized) {
      return this.stripe;
    }

    try {
      this.stripe = await loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
      if (!this.stripe) {
        throw new Error('Failed to load Stripe');
      }
      this.isInitialized = true;
      return this.stripe;
    } catch (error) {
      console.error('Stripe initialization failed:', error);
      throw new Error('Failed to initialize Stripe');
    }
  }

  /**
   * Create a one-time donation checkout session
   */
  async createOneTimeDonationSession(donationData: StripeDonationData): Promise<StripeCheckoutSession> {
    try {
      // For testing purposes, redirect to a Stripe test checkout
      // In production, you'd create a real checkout session via your backend
      
      // Create a simple checkout URL (you'll replace this with your real Stripe checkout URL)
      const checkoutUrl = `https://checkout.stripe.com/pay/cs_test_a1BcDeF2gHiJkLmNoPqRsT3uVwXyZ4#fidkdHxwZzktZ2tqZ2FwZGZtYVhPYVZtWjA0TjE0PW11PT02dGN1dzZDuZkJ1aFFEOWQ0T2EybUktR3H1aRxxYmZOY1Q0aUovYSt3PW9pNWk6Z01PNXFQNTRxTzZgTThkaXR8dTdRZ3Mgd2ZqYmtkPWNhdGFpaqRkY2Nka2pHaFp1ZGFYSk9MS0syTms#cC1jZ2g0WmR5SmdPY3dTZW1tfXZ1atfPGRVbUt3Hm52YmVKYV9GdUNLUTEpdGhEYmR1Sm5fTEpjVHVEY0olMjB1eXBkYjlrZfJjbY9kYA`;
      
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
      
      return {
        id: `session_${Date.now()}`,
        url: checkoutUrl,
        amount_total: donationData.amount,
        currency: STRIPE_CONFIG.CURRENCY,
        mode: 'payment',
        status: 'created',
      };
    } catch (error) {
      console.error('Failed to create one-time donation session:', error);
      throw error;
    }
  }

  /**
   * Create a recurring donation checkout session
   */
  async createRecurringDonationSession(donationData: StripeDonationData): Promise<StripeCheckoutSession> {
    const stripe = await this.initialize();

    try {
      // For recurring donations, we need to create a price first
      // Since this is a static site, we'll use predefined price IDs
      const priceId = this.getPriceIdForAmount(donationData.amount);

      const session = await stripe.redirectToCheckout({
        mode: STRIPE_CONFIG.MODES.RECURRING,
        lineItems: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: STRIPE_CONFIG.SUCCESS_URL,
        cancel_url: STRIPE_CONFIG.CANCEL_URL,
        customer_email: donationData.donorInfo.email,
        metadata: {
          donor_name: `${donationData.donorInfo.firstName} ${donationData.donorInfo.lastName}`,
          donor_email: donationData.donorInfo.email,
          donor_phone: donationData.donorInfo.phone,
          donor_address: donationData.donorInfo.address,
          foundation: STRIPE_CONFIG.FOUNDATION_NAME,
          donation_type: 'recurring',
          monthly_amount: donationData.amount.toString(),
          ...donationData.metadata,
        },
      });

      if (session.error) {
        throw new Error(session.error.message);
      }

      // For redirectToCheckout, we need to handle the redirect manually
      if (session.url) {
        window.location.href = session.url;
      }

      return {
        id: `session_${Date.now()}`,
        url: session.url || '',
        amount_total: donationData.amount,
        currency: STRIPE_CONFIG.CURRENCY,
        mode: STRIPE_CONFIG.MODES.RECURRING,
        status: 'created',
      };
    } catch (error) {
      console.error('Failed to create recurring donation session:', error);
      throw error;
    }
  }

  /**
   * Get the appropriate Stripe price ID for the donation amount
   * You'll need to create these prices in your Stripe dashboard
   */
  private getPriceIdForAmount(amount: number): string {
    // These are example price IDs - you need to create these in your Stripe dashboard
    const priceMap: Record<number, string> = {
      25: 'price_25_monthly',      // Replace with your actual price ID for $25/month
      50: 'price_50_monthly',      // Replace with your actual price ID for $50/month
      100: 'price_100_monthly',    // Replace with your actual price ID for $100/month
      250: 'price_250_monthly',    // Replace with your actual price ID for $250/month
      500: 'price_500_monthly',    // Replace with your actual price ID for $500/month
      1000: 'price_1000_monthly',  // Replace with your actual price ID for $1000/month
      5000: 'price_5000_monthly',  // Replace with your actual price ID for $5000/month
    };

    // Find the closest amount
    const amounts = Object.keys(priceMap).map(Number).sort((a, b) => a - b);
    const closestAmount = amounts.reduce((prev, curr) => 
      Math.abs(curr - amount) < Math.abs(prev - amount) ? curr : prev
    );

    const priceId = priceMap[closestAmount];
    if (!priceId) {
      throw new Error(`No price ID found for amount $${amount}. Please create a price in your Stripe dashboard.`);
    }

    return priceId;
  }

  /**
   * Create a custom payment element for embedded checkout
   */
  async createPaymentElement(amount: number, isMonthly: boolean): Promise<any> {
    const stripe = await this.initialize();

    try {
      const elements = stripe.elements({
        mode: isMonthly ? STRIPE_CONFIG.MODES.RECURRING : STRIPE_CONFIG.MODES.ONE_TIME,
        amount: Math.round(amount * 100),
        currency: STRIPE_CONFIG.CURRENCY,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2563eb', // Blue color matching your theme
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#dc2626',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
          },
        },
      });

      return elements;
    } catch (error) {
      console.error('Failed to create payment element:', error);
      throw error;
    }
  }

  /**
   * Confirm payment for embedded checkout
   */
  async confirmPayment(clientSecret: string, paymentMethod: any): Promise<any> {
    const stripe = await this.initialize();

    try {
      const result = await stripe.confirmPayment({
        elements: paymentMethod,
        confirmParams: {
          return_url: STRIPE_CONFIG.SUCCESS_URL,
        },
        redirect: 'if_required',
      });

      return result;
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      throw error;
    }
  }

  /**
   * Handle successful payment
   */
  async handleSuccessfulPayment(sessionId: string): Promise<any> {
    try {
      // In a real implementation, you would verify the session with your backend
      // For now, we'll return a success response
      return {
        success: true,
        sessionId,
        message: 'Payment successful! Thank you for your donation.',
      };
    } catch (error) {
      console.error('Failed to handle successful payment:', error);
      throw error;
    }
  }

  /**
   * Get donation history (placeholder for future implementation)
   */
  async getDonationHistory(email: string): Promise<any[]> {
    // This would typically call your backend to get donation history
    // For now, return empty array
    return [];
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<any> {
    try {
      // In a real implementation, you would call your backend to cancel the subscription
      // For now, return success
      return {
        success: true,
        message: 'Subscription cancelled successfully',
      };
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }
}

export const stripeService = new StripeService();
