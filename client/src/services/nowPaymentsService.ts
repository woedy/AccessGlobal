import { api } from '@/config/api';

export interface NowInvoiceResponse {
  success: boolean;
  donationId?: string;
  invoiceId?: string;
  url?: string;
  error?: string;
}

class NowPaymentsService {
  async createInvoice(params: { amount: number; donorInfo: { email: string }; message?: string; isPublic?: boolean }): Promise<NowInvoiceResponse> {
    const res = await fetch(api('now/create-invoice'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    try {
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data?.error || 'Failed to create NOWPayments invoice' };
      }
      return { success: true, donationId: data.donationId, invoiceId: data.invoiceId, url: data.url };
    } catch {
      return { success: false, error: 'Invalid response from server' };
    }
  }
}

export const nowPaymentsService = new NowPaymentsService();

