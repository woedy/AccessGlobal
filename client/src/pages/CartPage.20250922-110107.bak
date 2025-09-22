import { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'wouter';
import { Minus, Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { processCheckout, CheckoutCustomerInfo } from '../services/storeCheckoutService';
import { toast } from '@/hooks/use-toast';

const CUSTOMER_STORAGE_KEY = 'access_global_checkout_customer';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialCustomer: CheckoutCustomerInfo = {
  name: '',
  email: '',
  phone: '',
  notes: '',
};

type CustomerErrors = Partial<Record<keyof CheckoutCustomerInfo, string>>;

const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customer, setCustomer] = useState<CheckoutCustomerInfo>(() => {
    if (typeof window === 'undefined') return initialCustomer;
    try {
      const stored = window.localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (!stored) return initialCustomer;
      const parsed = JSON.parse(stored);
      return {
        name: parsed?.name || '',
        email: parsed?.email || '',
        phone: parsed?.phone || '',
        notes: parsed?.notes || '',
      };
    } catch {
      return initialCustomer;
    }
  });
  const [customerErrors, setCustomerErrors] = useState<CustomerErrors>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    if (!isCheckingOut) return;
    const timer = setTimeout(() => {
      setIsCheckingOut(false);
    }, 20000);
    return () => clearTimeout(timer);
  }, [isCheckingOut]);

  const handleCustomerChange = (
    field: keyof CheckoutCustomerInfo,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setCustomer(prev => ({ ...prev, [field]: value }));
    setCustomerErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateCustomer = (): CustomerErrors => {
    const errors: CustomerErrors = {};
    if (!customer.name.trim()) {
      errors.name = 'Please enter your name';
    }
    if (!customer.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(customer.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (customer.phone && customer.phone.trim().length < 7) {
      errors.phone = 'Phone number looks too short';
    }
    if (customer.notes && customer.notes.length > 500) {
      errors.notes = 'Notes should be under 500 characters';
    }
    return errors;
  };

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;

    const validation = validateCustomer();
    if (Object.keys(validation).length > 0) {
      setCustomerErrors(validation);
      toast({
        title: 'Contact details needed',
        description: 'Please fix the highlighted fields before continuing.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsCheckingOut(true);
      await processCheckout(items, customer);
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout failed',
        description: error?.message || 'Failed to start checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/store"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
          </div>

          <div className="divide-y divide-gray-200">
            {items.map((item) => {
              const variant = item.selectedVariant;
              const variantId = variant?.id ?? null;
              const unitPrice = variant?.price ?? item.price;
              const lineTotal = unitPrice * item.quantity;
              const variantLabel = variant?.name ?? null;
              const variantMeta = variant?.size || variant?.color
                ? [variant?.size, variant?.color].filter(Boolean).join(' • ')
                : null;
              const stockCeiling = variant?.stock ?? item.stock;
              const usableStock = stockCeiling !== undefined && stockCeiling !== null ? Number(stockCeiling) : Infinity;
              const disableIncrease = Number.isFinite(usableStock) && item.quantity >= usableStock;
              const remaining = Number.isFinite(usableStock) ? Math.max(0, usableStock - item.quantity) : null;

              return (
                <div key={`${item.id}-${variantId ?? 'default'}`} className="p-6 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-32 h-32 rounded-md object-cover object-center"
                    />
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link href={`/store/${item.slug}`} className="hover:text-amber-600">
                            {item.name}
                          </Link>
                        </h3>
                        {variantLabel && (
                          <p className="text-sm text-gray-600">
                            Option: {variantLabel}
                            {variantMeta ? ` (${variantMeta})` : ''}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        {Number.isFinite(usableStock) && remaining !== null && remaining > 0 && (
                          <p className="mt-1 text-xs text-gray-400">{remaining} remaining</p>
                        )}
                        {Number.isFinite(usableStock) && remaining === 0 && (
                          <p className="mt-1 text-xs text-amber-600">You've reached the available quantity for this item.</p>
                        )}
                      </div>
                      <p className="text-lg font-medium text-gray-900">{formatCurrency(lineTotal)}</p>
                    </div>

                    <div className="mt-4 flex items-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, variantId)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, variantId)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
                          disabled={disableIncrease}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, variantId)}
                        className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 px-6 py-6 bg-gray-50 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Contact details</h2>
              <p className="text-sm text-gray-500">We will send your receipt and order updates to this email. Phone is optional but helps carriers get in touch.</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="customer-name" className="text-sm font-medium text-gray-700">Full name</label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customer.name}
                    onChange={(event) => handleCustomerChange('name', event)}
                    className={`mt-1 block w-full rounded-md border ${customerErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'} shadow-sm px-3 py-2`}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  {customerErrors.name && <span className="mt-1 text-xs text-red-600">{customerErrors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="customer-email" className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="customer-email"
                    type="email"
                    value={customer.email}
                    onChange={(event) => handleCustomerChange('email', event)}
                    className={`mt-1 block w-full rounded-md border ${customerErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'} shadow-sm px-3 py-2`}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {customerErrors.email && <span className="mt-1 text-xs text-red-600">{customerErrors.email}</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="customer-phone" className="text-sm font-medium text-gray-700">Phone (optional)</label>
                  <input
                    id="customer-phone"
                    type="tel"
                    value={customer.phone || ''}
                    onChange={(event) => handleCustomerChange('phone', event)}
                    className={`mt-1 block w-full rounded-md border ${customerErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'} shadow-sm px-3 py-2`}
                    placeholder="For delivery updates"
                    autoComplete="tel"
                  />
                  {customerErrors.phone && <span className="mt-1 text-xs text-red-600">{customerErrors.phone}</span>}
                </div>
                <div className="flex flex-col sm:col-span-2">
                  <label htmlFor="customer-notes" className="text-sm font-medium text-gray-700">Delivery notes (optional)</label>
                  <textarea
                    id="customer-notes"
                    value={customer.notes || ''}
                    onChange={(event) => handleCustomerChange('notes', event)}
                    className={`mt-1 block w-full rounded-md border ${customerErrors.notes ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'} shadow-sm px-3 py-2 h-24`}
                    placeholder="Apartment access codes, preferred delivery times, etc."
                  />
                  {customerErrors.notes && <span className="mt-1 text-xs text-red-600">{customerErrors.notes}</span>}
                </div>
              </div>
            </div>

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
            <p className="text-sm text-gray-500">Shipping and taxes are calculated at checkout.</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/store"
                className="flex-1 flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || items.length === 0}
                className={`flex-1 flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  isCheckingOut || items.length === 0
                    ? 'bg-amber-400 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400">You will be redirected to our secure Stripe checkout to complete your purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
