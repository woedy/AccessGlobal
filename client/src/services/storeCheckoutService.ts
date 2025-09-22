import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from '../types/product';
import { api } from '@/config/api';
import { STRIPE_CONFIG } from '@/config/stripe';

export interface CheckoutCustomerInfo {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

const stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);

export const processCheckout = async (items: CartItem[], customer: CheckoutCustomerInfo) => {
  if (!items.length) {
    throw new Error('Your cart is empty');
  }

  const sanitizedCustomer = {
    name: customer?.name?.trim() || '',
    email: customer?.email?.trim() || '',
    phone: customer?.phone?.trim() || '',
    notes: customer?.notes?.trim() || '',
  };

  if (!sanitizedCustomer.name) {
    throw new Error('Please enter your name before checking out.');
  }
  if (!sanitizedCustomer.email) {
    throw new Error('Please enter your email before checking out.');
  }

  try {
    const payload = {
      items: items.map(item => ({
        productId: item.id,
        slug: item.slug,
        quantity: item.quantity,
        variantId: item.selectedVariant?.id,
      })),
      customer: sanitizedCustomer,
      successUrl: `${window.location.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/cart`,
    };

    const response = await fetch(api('store/checkout'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Checkout session failed (${response.status}): ${text || response.statusText}`);
    }

    const data = await response.json();
    const sessionId = data?.sessionId;
    if (!sessionId) {
      throw new Error('Checkout endpoint did not return a sessionId');
    }

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};
