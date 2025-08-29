import { getApiUrl } from '@/config/api';
import { stripeService, StripeDonationData } from './stripeService';

// Types for donation data
export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

export interface MomoDetails {
  provider: string;
  phoneNumber: string;
}

export interface CryptoDetails {
  walletAddress: string;
  cryptocurrency: string;
}

export interface StripeDetails {
  email: string;
}

export interface PayPalDetails {
  email: string;
}

export interface DonationData {
  amount: number;
  isMonthly: boolean;
  monthlyPlan?: string;
  paymentMethod: 'card' | 'bank' | 'momo' | 'crypto' | 'stripe' | 'paypal';
  donorInfo: DonorInfo;
  paymentDetails: CardDetails | BankDetails | MomoDetails | CryptoDetails | StripeDetails | PayPalDetails;
}

export interface DonationResponse {
  success: boolean;
  transactionId: string;
  message: string;
  error?: string;
  redirectUrl?: string; // For Stripe/PayPal redirects
}

class DonationService {
  
  async submitDonation(donationData: DonationData): Promise<DonationResponse> {
    try {
      // Only Stripe payments are active for now
      if (donationData.paymentMethod === 'stripe') {
        return this.handleStripeCheckout(donationData);
      }
      
      // All other payment methods are temporarily disabled
      return {
        success: false,
        transactionId: '',
        message: 'This payment method is temporarily unavailable. Please use Stripe for secure donations.',
        error: 'Payment method not available',
      };
    } catch (error) {
      console.error('Donation submission failed:', error);
      return {
        success: false,
        transactionId: '',
        message: 'Donation failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async handleStripeCheckout(donationData: DonationData): Promise<DonationResponse> {
    try {
      // Convert to Stripe donation data format
      const stripeDonationData: StripeDonationData = {
        amount: donationData.amount,
        isMonthly: donationData.isMonthly,
        monthlyPlan: donationData.monthlyPlan,
        donorInfo: donationData.donorInfo,
        metadata: {
          foundation: 'Access Global Foundation',
          donation_type: donationData.isMonthly ? 'recurring' : 'one_time',
        },
      };

      // Use Stripe service to create checkout session
      let session;
      if (donationData.isMonthly) {
        session = await stripeService.createRecurringDonationSession(stripeDonationData);
      } else {
        session = await stripeService.createOneTimeDonationSession(stripeDonationData);
      }
      
      if (session.url) {
        // Redirect to Stripe hosted checkout
        window.location.href = session.url;
        return {
          success: true,
          transactionId: session.id,
          message: 'Redirecting to Stripe checkout...',
          redirectUrl: session.url,
        };
      } else {
        throw new Error('Failed to create Stripe checkout session');
      }
    } catch (error) {
      console.error('Stripe checkout failed:', error);
      return {
        success: false,
        transactionId: '',
        message: 'Stripe checkout failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }





  // Optional: Add other methods as needed for your static site
  async validatePayment(paymentMethod: string, paymentDetails: any): Promise<{ valid: boolean; message?: string }> {
    // For static site, basic validation
    if (paymentMethod === 'stripe' && paymentDetails.email) {
      return { valid: true, message: 'Payment method validated' };
    }
    if (paymentMethod === 'paypal' && paymentDetails.email) {
      return { valid: true, message: 'Payment method validated' };
    }
    return { valid: false, message: 'Please provide valid payment details' };
  }

  async getDonationHistory(email: string): Promise<any[]> {
    // For static site, return empty array
    // In production, this would call your backend API
    return [];
  }

  // Get crypto exchange rates (optional)
  async getCryptoRates(): Promise<Record<string, number>> {
    // For static site, return empty object
    // In production, this would call your backend API
    return {};
  }
}



export const donationService = new DonationService(); 