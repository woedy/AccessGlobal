// Stripe Configuration
// Stripe credentials are now loaded from .env file
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',

  // Foundation Information
  FOUNDATION_NAME: import.meta.env.VITE_FOUNDATION_NAME || 'Access Global Foundation',
  FOUNDATION_DESCRIPTION: import.meta.env.VITE_FOUNDATION_DESCRIPTION || 'Help us launch our mission to create pathways to opportunity',

  // URLs
  SUCCESS_URL: import.meta.env.VITE_SUCCESS_URL || 'http://localhost:5173/donate-success?session_id={CHECKOUT_SESSION_ID}',
  CANCEL_URL: import.meta.env.VITE_CANCEL_URL || 'http://localhost:5173/donate',

  // Currency
  CURRENCY: 'usd',

  // Payment Modes
  MODES: {
    ONE_TIME: 'payment',
    RECURRING: 'subscription'
  }
} as const;
