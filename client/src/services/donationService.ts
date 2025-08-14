import { getApiUrl } from '@/config/api';

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
      const response = await fetch(getApiUrl('/donations/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers your Django backend requires
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        transactionId: result.transaction_id || `AGF${Date.now()}`,
        message: result.message || 'Donation processed successfully',
        redirectUrl: result.redirect_url, // For payment gateway redirects
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

  // Optional: Add other methods as needed for your Django backend
  async validatePayment(paymentMethod: string, paymentDetails: any): Promise<{ valid: boolean; message?: string }> {
    try {
      const response = await fetch(getApiUrl('/donations/validate-payment/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod, paymentDetails }),
      });

      if (!response.ok) {
        return { valid: false, message: 'Payment validation failed' };
      }

      const result = await response.json();
      return { valid: result.valid, message: result.message };
    } catch (error) {
      console.error('Payment validation failed:', error);
      return { valid: false, message: 'Payment validation failed' };
    }
  }

  async getDonationHistory(email: string): Promise<any[]> {
    try {
      const response = await fetch(getApiUrl(`/donations/history/?email=${encodeURIComponent(email)}`), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return [];
      }

      const result = await response.json();
      return result.donations || [];
    } catch (error) {
      console.error('Failed to fetch donation history:', error);
      return [];
    }
  }

  // Get crypto exchange rates (optional)
  async getCryptoRates(): Promise<Record<string, number>> {
    try {
      const response = await fetch(getApiUrl('/crypto/rates/'), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return {};
      }

      const result = await response.json();
      return result.rates || {};
    } catch (error) {
      console.error('Failed to fetch crypto rates:', error);
      return {};
    }
  }
}

export const donationService = new DonationService(); 