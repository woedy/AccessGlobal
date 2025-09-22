import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { CheckCircle, Home, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { api } from '@/config/api';

type OrderSummaryItem = {
  productId?: string;
  productName?: string;
  variantId?: string | null;
  variantName?: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal?: number;
  price_data?: {
    product_data?: { name?: string };
    unit_amount?: number;
    currency?: string;
  };
};

type OrderSummary = {
  items: OrderSummaryItem[];
  subtotal?: number;
  notes?: string | null;
};

type OrderCustomer = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

type OrderDetails = {
  id: string;
  status: string;
  deliveryStatus?: string;
  items?: OrderSummaryItem[];
  summary?: OrderSummary;
  total?: number;
  amount_total?: number;
  currency?: string;
  shipping_details?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
  customer_details?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  customer?: OrderCustomer;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
};

const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

const formatAddress = (address?: OrderDetails['shipping_details'] extends { address: infer A } ? A : never) => {
  if (!address) return null;
  const parts = [address.line1, address.line2, address.city, address.state, address.postal_code, address.country].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
};

export default function OrderSuccess() {
  const [location] = useLocation();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('No session ID found in URL');
      setLoading(false);
      return;
    }

    clearCart();

    (async () => {
      try {
        const res = await fetch(api(`orders/session/${sessionId}`));
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `Failed to fetch order (${res.status})`);
        }
        const data: OrderDetails = await res.json();
        setOrder(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load your order');
      } finally {
        setLoading(false);
      }
    })();
  }, [location, clearCart]);

  const displayCurrency = order?.currency?.toUpperCase() || 'USD';
  const lineItems = useMemo(() => {
    if (!order) return [] as OrderSummaryItem[];
    if (order.summary?.items?.length) {
      return order.summary.items;
    }
    if (order.items?.length) {
      return order.items;
    }
    return [] as OrderSummaryItem[];
  }, [order]);

  const orderTotal = useMemo(() => {
    if (!order) return 0;
    if (order.amount_total !== undefined) return order.amount_total;
    if (order.total !== undefined) return order.total;
    if (order.summary?.subtotal !== undefined) return order.summary.subtotal;
    const computed = lineItems.reduce((sum, item) => {
      if (item.lineTotal !== undefined) return sum + item.lineTotal;
      const unit = item.unitPrice ?? (item.price_data?.unit_amount ? item.price_data.unit_amount / 100 : 0);
      return sum + unit * (item.quantity || 0);
    }, 0);
    return computed;
  }, [order, lineItems]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/store"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <ShoppingBag className="-ml-1 mr-2 h-5 w-5" />
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const shippingAddress = formatAddress(order.shipping_details?.address);
  const customerName = order.customer?.name || order.customer_details?.name || order.shipping_details?.name || 'Customer';
  const customerEmail = order.customer?.email || order.customer_details?.email || '';
  const deliveryStatus = order.deliveryStatus || 'processing';
  const orderNotes = order.summary?.notes ?? order.notes ?? null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We sent a receipt to {customerEmail || 'your email'}.
          </p>
          <p className="mt-2 text-gray-700">
            Total: {formatCurrency(orderTotal, displayCurrency)}
          </p>
          <p className="mt-1 text-sm text-gray-500">Order #{order.id}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-600" />
              Delivery status
            </h2>
            <p className="mt-2 text-sm font-medium capitalize text-gray-700">{deliveryStatus.replace(/_/g, ' ')}</p>
            {shippingAddress && (
              <p className="mt-4 text-sm text-gray-600">
                Shipping to: <span className="font-medium text-gray-800">{shippingAddress}</span>
              </p>
            )}
            {orderNotes && (
              <p className="mt-3 text-sm text-gray-600">Note: {orderNotes}</p>
            )}
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
            <p className="mt-2 text-sm text-gray-700">{customerName}</p>
            {customerEmail && <p className="text-sm text-gray-600">{customerEmail}</p>}
            {order.customer?.phone || order.customer_details?.phone ? (
              <p className="text-sm text-gray-600">{order.customer?.phone || order.customer_details?.phone}</p>
            ) : null}
          </div>
        </div>

        {lineItems.length ? (
          <div className="mt-10 border-t border-gray-200 pt-10 text-left">
            <h2 className="text-lg font-medium text-gray-900">Items</h2>
            <ul className="mt-4 space-y-3">
              {lineItems.map((item, index) => {
                const baseName = item.productName || item.price_data?.product_data?.name || `Item ${index + 1}`;
                const name = item.variantName ? `${baseName} (${item.variantName})` : baseName;
                const unitPrice = item.unitPrice ?? (item.price_data?.unit_amount ? item.price_data.unit_amount / 100 : 0);
                const lineTotal = item.lineTotal ?? unitPrice * (item.quantity || 0);
                return (
                  <li key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <div>
                      <p className="font-medium text-gray-900">{name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right text-gray-900 font-semibold">
                      <p>{formatCurrency(lineTotal, displayCurrency)}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(unitPrice, displayCurrency)} each</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/store"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <ShoppingBag className="-ml-1 mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <Home className="-ml-1 mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
