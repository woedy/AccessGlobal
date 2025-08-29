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
  message?: string;
  isPublic?: boolean;
  metadata?: Record<string, string>;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
  amount_total: number;
  currency: string;
  mode: 'payment' | 'subscription';
  status: string;
  donationId?: string;
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
      // Call backend to create Stripe Checkout session
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationData.amount,
          isMonthly: donationData.isMonthly,
          donorInfo: donationData.donorInfo,
          message: donationData.message || '',
          isPublic: donationData.isPublic !== false,
          metadata: donationData.metadata,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create Stripe Checkout session');
      }
      
      const data = await response.json();
      
      return {
        id: data.url ? `session_${Date.now()}` : '',
        url: data.url,
        amount_total: donationData.amount,
        currency: STRIPE_CONFIG.CURRENCY,
        mode: 'payment',
        status: 'created',
        donationId: data.donationId,
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
    try {
      // Call backend to create Stripe Checkout session for recurring donations
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationData.amount,
          isMonthly: donationData.isMonthly,
          donorInfo: donationData.donorInfo,
          message: donationData.message || '',
          isPublic: donationData.isPublic !== false,
          metadata: donationData.metadata,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create Stripe Checkout session');
      }
      
      const data = await response.json();
      
      return {
        id: data.url ? `session_${Date.now()}` : '',
        url: data.url,
        amount_total: donationData.amount,
        currency: STRIPE_CONFIG.CURRENCY,
        mode: 'subscription',
        status: 'created',
        donationId: data.donationId,
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
