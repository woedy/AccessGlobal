import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { api } from '@/config/api';
import { STRIPE_CONFIG } from '@/config/stripe';
import type { CartItem } from '@/types/product';

export interface CheckoutCustomerInfo {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = async () => {
  if (!STRIPE_CONFIG.PUBLISHABLE_KEY) {
    throw new Error('Stripe is not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to your environment.');
  }

  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
  }

  return stripePromise;
};

const sanitizeField = (value?: string | null) => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

const serializeCartItems = (items: CartItem[]) =>
  items.map(item => ({
    productId: item.id,
    slug: item.slug,
    quantity: item.quantity,
    variantId: item.selectedVariant?.id,
    name: item.name,
    variantName: item.selectedVariant?.name,
  }));

export const processCheckout = async (items: CartItem[], customer: CheckoutCustomerInfo) => {
  if (!items.length) {
    throw new Error('Your cart is empty');
  }

  const sanitizedCustomer = {
    name: sanitizeField(customer?.name),
    email: sanitizeField(customer?.email),
    phone: sanitizeField(customer?.phone),
    notes: sanitizeField(customer?.notes),
  };

  if (!sanitizedCustomer.name) {
    throw new Error('Please enter your name before checking out.');
  }
  if (!sanitizedCustomer.email) {
    throw new Error('Please enter your email before checking out.');
  }

  try {
    const payload = {
      items: serializeCartItems(items),
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

    const stripe = await getStripe();
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
