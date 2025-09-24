import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import type { CartItem } from '@/types/product';
import { processCheckout, type CheckoutCustomerInfo } from '@/services/storeCheckoutService';

const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

type FieldErrors = Partial<Record<keyof CheckoutCustomerInfo, string>>;

const CHECKOUT_CUSTOMER_STORAGE_KEY = 'access_global_checkout_customer';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, subtotal, bundleDiscount } = useCart();

  const [customer, setCustomer] = useState<CheckoutCustomerInfo>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(CHECKOUT_CUSTOMER_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        setCustomer(prev => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch (err) {
      console.warn('Unable to restore checkout contact info:', err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(CHECKOUT_CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
    } catch (err) {
      console.warn('Unable to persist checkout contact info:', err);
    }
  }, [customer]);

  const onChangeField = (field: keyof CheckoutCustomerInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setCustomer(prev => ({ ...prev, [field]: value }));
      setFieldErrors(prev => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const unitPrice = (item: CartItem) => item.selectedVariant?.price ?? item.price;
  const lineTotal = (item: CartItem) => unitPrice(item) * item.quantity;

  const validateCustomer = () => {
    const errors: FieldErrors = {};
    const name = customer.name?.trim() ?? '';
    const email = customer.email?.trim() ?? '';

    if (!name) {
      errors.name = 'Please provide the name we can address your receipt to.';
    }
    if (!email) {
      errors.email = 'An email is required so we can send your receipt.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }

    return errors;
  };

  const handleCheckout = async () => {
    setError(null);
    const nextErrors = validateCustomer();
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    try {
      setLoading(true);
      await processCheckout(items, customer);
      // redirect handled by Stripe on success
    } catch (e: any) {
      setError(e?.message || 'Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-600">Browse our store and add items to your cart.</p>
          <div className="mt-6">
            <Link
              href="/store"
              className="inline-flex items-center px-6 py-3 rounded-md bg-amber-600 text-white font-medium hover:bg-amber-700"
            >
              Go to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
        <p className="mt-1 text-sm text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartRow
                key={`${item.id}:${item.selectedVariant?.id ?? 'base'}`}
                item={item}
                onRemove={() => removeFromCart(item.id, item.selectedVariant?.id)}
                onChangeQty={(q) => updateQuantity(item.id, q, item.selectedVariant?.id)}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {bundleDiscount !== 0 && (
                <div
                  className={`flex justify-between ${
                    bundleDiscount > 0 ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  <span>Bundle pricing adjustment</span>
                  <span>
                    {bundleDiscount > 0 ? '-' : '+'}
                    {formatCurrency(Math.abs(bundleDiscount))}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Each item is $29.99 on its own; buy any two together to lock in the $50 bundle pricing automatically.
            </p>
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
              {items.map(item => {
                const price = unitPrice(item);
                return (
                  <div key={`${item.id}:${item.selectedVariant?.id ?? 'base'}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      {item.selectedVariant?.name && (
                        <p className="text-xs text-gray-500">{item.selectedVariant.name}</p>
                      )}
                      {(item.selectedVariant?.color || item.selectedVariant?.size) && (
                        <p className="text-xs text-gray-500">
                          {[item.selectedVariant?.color, item.selectedVariant?.size].filter(Boolean).join(' • ')}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(lineTotal(item))}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(price)} each</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t pt-4 flex justify-between text-gray-900 font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Jane Doe"
                  value={customer.name}
                  onChange={onChangeField('name')}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="jane@example.com"
                  value={customer.email}
                  onChange={onChangeField('email')}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                <input
                  type="tel"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="+1 555-123-4567"
                  value={customer.phone || ''}
                  onChange={onChangeField('phone')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Delivery notes, preferences, etc."
                  value={customer.notes || ''}
                  onChange={onChangeField('notes')}
                />
              </div>

              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full inline-flex justify-center items-center px-6 py-3 rounded-md bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Redirecting to Stripe…' : 'Checkout with Stripe'}
              </button>
              <Link
                href="/store"
                className="block w-full text-center text-sm text-gray-600 hover:text-gray-800"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartRow({
  item,
  onRemove,
  onChangeQty,
}: {
  item: CartItem;
  onRemove: () => void;
  onChangeQty: (q: number) => void;
}) {
  const price = item.selectedVariant?.price ?? item.price;
  const variant = item.selectedVariant;
  const name = item.name;
  const variantMeta = [variant?.color, variant?.size].filter(Boolean).join(' • ');
  const handleDec = () => onChangeQty(Math.max(1, item.quantity - 1));
  const handleInc = () => onChangeQty(item.quantity + 1);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex gap-4">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.images?.[0] || 'https://placehold.co/300x300/eee/aaa?text=No+Image'}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x300/eee/aaa?text=Image'; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-medium text-gray-900">{name}</p>
            {variant?.name && (
              <p className="text-xs text-gray-500">{variant.name}</p>
            )}
            {variantMeta && <p className="text-xs text-gray-500">{variantMeta}</p>}
            <p className="mt-1 text-sm text-gray-500">{formatCurrency(price)} each</p>
          </div>
          <button
            onClick={onRemove}
            className="text-sm text-red-600 hover:text-red-700"
            aria-label="Remove from cart"
          >
            Remove
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="inline-flex items-center rounded-md border border-gray-300">
            <button onClick={handleDec} className="px-3 py-1 text-gray-700 hover:bg-gray-50">-</button>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => onChangeQty(Math.max(1, Number(e.target.value || 1)))}
              className="w-14 text-center border-x border-gray-300 py-1 outline-none"
            />
            <button onClick={handleInc} className="px-3 py-1 text-gray-700 hover:bg-gray-50">+</button>
          </div>
          <div className="ml-auto text-sm font-medium text-gray-900">
            {formatCurrency(price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
