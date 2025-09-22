import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import type { CartItem } from '@/types/product';
import { processCheckout, type CheckoutCustomerInfo } from '@/services/storeCheckoutService';

const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  const [customer, setCustomer] = useState<CheckoutCustomerInfo>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const onChangeField = (field: keyof CheckoutCustomerInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setCustomer(prev => ({ ...prev, [field]: e.target.value }));

  const unitPrice = (item: CartItem) => item.selectedVariant?.price ?? item.price;
  const lineTotal = (item: CartItem) => unitPrice(item) * item.quantity;

  const handleCheckout = async () => {
    setError(null);
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
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
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
                {loading ? 'Redirecting...' : 'Checkout with Stripe'}
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
  const name = item.selectedVariant ? `${item.name} (${item.selectedVariant.name})` : item.name;
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
            <p className="mt-1 text-sm text-gray-500">{formatCurrency(price)}</p>
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
