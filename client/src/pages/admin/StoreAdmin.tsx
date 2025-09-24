import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types/product';
import { fetchProducts, upsertProduct, deleteProduct } from '@/services/productService';
import { api } from '@/config/api';

type StoreOrderSummaryItem = {
  productName?: string;
  variantName?: string | null;
  quantity: number;
  unitPrice?: number;
  lineTotal?: number;
};

type StoreOrder = {
  id: string;
  status: string;
  deliveryStatus?: string;
  total?: number;
  amount_total?: number;
  currency?: string;
  summary?: {
    items?: StoreOrderSummaryItem[];
    subtotal?: number;
    notes?: string | null;
  };
  customer?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
};

const ADMIN_KEY_STORAGE = 'access_global_admin_key';
const DELIVERY_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const ORDER_STATUSES = ['pending', 'completed', 'failed', 'refunded'];
const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'catalog', label: 'Products' },
  { id: 'orders', label: 'Orders' },
  { id: 'settings', label: 'Settings' },
];

const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount || 0);

const readInitialKey = () => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(ADMIN_KEY_STORAGE) || '';
};

export default function StoreAdmin() {
  const [adminKey, setAdminKey] = useState<string>(() => readInitialKey());
  const [connected, setConnected] = useState<boolean>(() => Boolean(readInitialKey()));
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draftProduct, setDraftProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: '',
    images: [''],
    inStock: true,
  });

  const isAuthenticated = connected && Boolean(adminKey);

  const fetchOrders = useCallback(async (key: string) => {
    const response = await fetch(api('store/orders'), {
      headers: {
        'x-admin-key': key,
      },
    });
    if (!response.ok) {
      const msg = await response.text().catch(() => '');
      throw new Error(msg || `Failed to fetch orders (${response.status})`);
    }
    return response.json() as Promise<StoreOrder[]>;
  }, []);

  const loadData = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError(null);
    try {
      const [productList, orderList] = await Promise.all([
        fetchProducts(),
        fetchOrders(adminKey),
      ]);
      setProducts(productList);
      setOrders(orderList);
    } catch (err: any) {
      console.error('Admin load failed:', err);
      const message = String(err?.message || '').toLowerCase().includes('failed to fetch')
        ? 'Unable to reach the API. Make sure the Express server is running on port 3002 and that your admin key is valid.'
        : err?.message || 'Failed to load admin data. Check your admin key.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [adminKey, fetchOrders]);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [isAuthenticated, loadData]);

  const handleConnect = async () => {
    if (!adminKey.trim()) {
      setError('Enter the admin API key from your server environment.');
      return;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ADMIN_KEY_STORAGE, adminKey.trim());
    }
    setConnected(true);
    await loadData();
  };

  const handleLogout = () => {
    setConnected(false);
    setAdminKey('');
    setProducts([]);
    setOrders([]);
    setEditingProduct(null);
    setError(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_KEY_STORAGE);
    }
  };

  const resetDraft = () => {
    setEditingProduct(null);
    setDraftProduct({
      name: '',
      price: 0,
      description: '',
      category: '',
      images: [''],
      inStock: true,
    });
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setDraftProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      images: product.images.length ? product.images : [''],
      inStock: product.inStock,
      featured: product.featured,
      sku: product.sku,
      stock: product.stock,
      variants: product.variants,
    });
  };

  const updateDraft = <K extends keyof Product>(key: K, value: Product[K]) => {
    setDraftProduct(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const upsertDraftProduct = async () => {
    if (!draftProduct.name?.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!draftProduct.price || Number(draftProduct.price) <= 0) {
      setError('Enter a valid price');
      return;
    }
    try {
      const product = await upsertProduct(draftProduct, adminKey);
      setProducts(prev => {
        const existingIndex = prev.findIndex(item => item.id === product.id);
        if (existingIndex === -1) {
          return [product, ...prev];
        }
        const next = [...prev];
        next[existingIndex] = product;
        return next;
      });
      resetDraft();
      setError(null);
    } catch (err: any) {
      console.error('Failed to save product:', err);
      setError(err?.message || 'Failed to save product');
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      await deleteProduct(productId, adminKey);
      setProducts(prev => prev.filter(product => product.id !== productId));
      if (editingProduct?.id === productId) {
        resetDraft();
      }
    } catch (err: any) {
      console.error('Failed to delete product:', err);
      setError(err?.message || 'Failed to delete product');
    }
  };

  const updateOrder = async (orderId: string, updates: Partial<StoreOrder>) => {
    if (!adminKey) return;
    try {
      const response = await fetch(api(`store/orders/${orderId}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        const message = await response.text().catch(() => '');
        throw new Error(message || `Failed to update order (${response.status})`);
      }
      const updated = await response.json();
      setOrders(prev => prev.map(order => (order.id === updated.id ? updated : order)));
    } catch (err: any) {
      console.error('Failed to update order:', err);
      setError(err?.message || 'Failed to update order');
    }
  };

  const displayedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const aDate = new Date(a.updatedAt || a.createdAt || '').getTime();
      const bDate = new Date(b.updatedAt || b.createdAt || '').getTime();
      return bDate - aDate;
    });
  }, [orders]);

  const overview = useMemo(() => {
    const totalProducts = products.length;
    const liveProducts = products.filter(product => product.inStock).length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount_total ?? order.total ?? order.summary?.subtotal ?? 0), 0);
    const pendingOrders = orders.filter(order => (order.status || 'pending') === 'pending').length;
    const fulfillmentQueue = orders.filter(order => {
      const status = (order.deliveryStatus || 'pending').toLowerCase();
      return status !== 'delivered' && status !== 'cancelled';
    }).length;
    const avgOrderValue = orders.length ? totalRevenue / orders.length : 0;

    const productTotals = new Map<string, { name: string; quantity: number }>();
    orders.forEach(order => {
      order.summary?.items?.forEach(item => {
        if (!item.productName) return;
        const existing = productTotals.get(item.productName) || { name: item.productName, quantity: 0 };
        existing.quantity += item.quantity || 0;
        productTotals.set(item.productName, existing);
      });
    });
    const topSelling = Array.from(productTotals.values()).sort((a, b) => b.quantity - a.quantity)[0] || null;

    return {
      totalProducts,
      liveProducts,
      totalRevenue,
      pendingOrders,
      fulfillmentQueue,
      avgOrderValue,
      topSelling,
    };
  }, [orders, products]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const statusBadge = (status: string | undefined, type: 'order' | 'delivery') => {
    if (!status) return null;
    const normalized = status.toLowerCase();
    const palette = type === 'order'
      ? {
          pending: 'bg-amber-100 text-amber-700',
          completed: 'bg-emerald-100 text-emerald-700',
          failed: 'bg-rose-100 text-rose-600',
          refunded: 'bg-slate-200 text-slate-600',
        }
      : {
          pending: 'bg-slate-200 text-slate-600',
          processing: 'bg-blue-100 text-blue-600',
          shipped: 'bg-indigo-100 text-indigo-600',
          delivered: 'bg-emerald-100 text-emerald-700',
          cancelled: 'bg-rose-100 text-rose-600',
        };
    const color = palette[normalized as keyof typeof palette] || 'bg-slate-200 text-slate-600';
    return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${color}`}>{normalized}</span>;
  };

  const overviewCards = [
    {
      label: 'Total revenue',
      value: formatCurrency(overview.totalRevenue),
      delta: orders.length ? `${orders.length} lifetime orders` : 'No orders yet',
    },
    {
      label: 'Active products',
      value: `${overview.liveProducts}/${overview.totalProducts}`,
      delta: overview.totalProducts ? `${Math.round((overview.liveProducts / overview.totalProducts) * 100)}% in stock` : 'Add your first product',
    },
    {
      label: 'Pending fulfillment',
      value: overview.fulfillmentQueue,
      delta: overview.pendingOrders ? `${overview.pendingOrders} orders waiting for payment` : 'All payments settled',
    },
    {
      label: 'Avg. order value',
      value: formatCurrency(overview.avgOrderValue),
      delta: overview.topSelling ? `Top seller: ${overview.topSelling.name}` : 'No sales yet',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Store admin access</h1>
          <p className="mt-2 text-sm text-slate-500">
            Paste the <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">ADMIN_API_KEY</code> from your Express server <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">.env</code>. Make sure the backend is running on port 3002 before connecting.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          )}

          <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-slate-500">Admin API key</label>
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="sk-admin-..."
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          <button
            onClick={handleConnect}
            className="mt-6 w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-700"
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>

          <p className="mt-4 text-xs text-slate-400">
            Need help? Start the backend with <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">node server/index.js</code> (or your npm script) while Vite runs with <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">npm run dev</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg border-r border-slate-200">
        <div className="px-6 py-5 border-b border-slate-200">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">AGF Store</p>
          <p className="text-lg font-bold text-slate-800">Admin Hub</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200 text-xs text-slate-500">
          <p>
            Connected with admin key.{" "}
            <button className="text-amber-600 font-semibold" onClick={handleLogout}>
              Sign out
            </button>
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Store dashboard</h1>
              <p className="text-sm text-slate-500">Monitor sales, manage inventory, and keep supporters in the loop.</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
              <input
                type="password"
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                placeholder="Enter admin API key"
                className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none"
              />
              <button
                onClick={handleConnect}
                className="inline-flex items-center justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-amber-700"
                disabled={loading}
              >
                {loading ? 'Syncing...' : 'Sync'}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          )}

          <section id="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                <p className="text-sm text-slate-500">Quick snapshot of how your store is performing.</p>
              </div>
              <button
                onClick={loadData}
                className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
                disabled={loading}
              >
                Refresh
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map(card => (
                <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{card.label}</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">{card.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{card.delta}</p>
                </div>
              ))}
            </div>

            {overview.topSelling && (
              <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-amber-50 to-white p-5">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-amber-700">Top seller:</span> {overview.topSelling.name} ({overview.topSelling.quantity} items fulfilled)
                </p>
              </div>
            )}
          </section>

          <section id="catalog" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Product catalog</h2>
              <p className="text-sm text-slate-500">Keep merchandise fresh and accurate so supporters know exactly what they are getting.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {editingProduct ? 'Edit product' : 'Add new product'}
                  </h3>
                  {editingProduct && (
                    <button
                      onClick={resetDraft}
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</label>
                    <input
                      value={draftProduct.name || ''}
                      onChange={(event) => updateDraft('name', event.target.value as Product['name'])}
                      placeholder="Product name"
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Price (USD)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={draftProduct.price ?? 0}
                      onChange={(event) => updateDraft('price', Number(event.target.value) as Product['price'])}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</label>
                    <input
                      value={draftProduct.category || ''}
                      onChange={(event) => updateDraft('category', event.target.value as Product['category'])}
                      placeholder="apparel, accessories, etc."
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
                    <textarea
                      value={draftProduct.description || ''}
                      onChange={(event) => updateDraft('description', event.target.value as Product['description'])}
                      placeholder="Share what makes this special."
                      className="mt-1 h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Hero image URL</label>
                    <input
                      value={draftProduct.images?.[0] || ''}
                      onChange={(event) => updateDraft('images', [event.target.value] as Product['images'])}
                      placeholder="https://..."
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={draftProduct.inStock !== false}
                        onChange={(event) => updateDraft('inStock', event.target.checked as Product['inStock'])}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      In stock
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={Boolean(draftProduct.featured)}
                        onChange={(event) => updateDraft('featured', event.target.checked as Product['featured'])}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      Featured item
                    </label>
                  </div>
                  <button
                    onClick={upsertDraftProduct}
                    className="w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-700"
                  >
                    {editingProduct ? 'Update product' : 'Add product'}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-900">Inventory</h3>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{products.length} items</span>
                </div>
                <div className="max-h-[460px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-slate-500">Product</th>
                        <th className="px-3 py-2 text-right font-semibold text-slate-500">Price</th>
                        <th className="px-3 py-2 text-right font-semibold text-slate-500">Stock</th>
                        <th className="px-3 py-2" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="px-3 py-2">
                            <p className="font-medium text-slate-800">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.category}</p>
                          </td>
                          <td className="px-3 py-2 text-right text-slate-700">{formatCurrency(product.price)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">
                            {product.inStock ? 'In stock' : 'Out of stock'}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <button
                              onClick={() => startEditing(product)}
                              className="text-xs font-semibold text-amber-600 hover:text-amber-700 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section id="orders" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Orders</h2>
              <p className="text-sm text-slate-500">Track supporter purchases, update fulfillment status, and trigger delivery updates.</p>
            </div>

            {displayedOrders.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                No orders yet. Once customers complete checkout, you'll see them here.
              </div>
            ) : (
              <div className="space-y-4">
                {displayedOrders.map(order => {
                  const subtotal = order.summary?.subtotal ?? order.amount_total ?? order.total ?? 0;
                  const currency = order.currency || 'USD';
                  return (
                    <div key={order.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-sm font-semibold text-slate-900">Order #{order.id}</h3>
                            {statusBadge(order.status, 'order')}
                            {statusBadge(order.deliveryStatus, 'delivery')}
                          </div>
                          <p className="text-xs text-slate-500">{new Date(order.updatedAt || order.createdAt || '').toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={order.status}
                            onChange={(event) => updateOrder(order.id, { status: event.target.value })}
                            className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700"
                          >
                            {ORDER_STATUSES.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                          <select
                            value={order.deliveryStatus || 'pending'}
                            onChange={(event) => updateOrder(order.id, { deliveryStatus: event.target.value })}
                            className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700"
                          >
                            {DELIVERY_STATUSES.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="font-medium text-slate-700">{formatCurrency(subtotal, currency)}</span>
                        {order.customer?.email && <span>Email: {order.customer.email}</span>}
                        {order.customer?.name && <span>Name: {order.customer.name}</span>}
                      </div>

                      {order.summary?.items && order.summary.items.length > 0 && (
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                          {order.summary.items.map((item, idx) => (
                            <li key={`${order.id}-${idx}`} className="flex justify-between">
                              <span>{item.productName}{item.variantName ? ` (${item.variantName})` : ''}</span>
                              <span>x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {order.summary?.notes && (
                        <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">Customer notes: {order.summary.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section id="settings" className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Admin settings</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-600">
                The admin dashboard is secured with a static API key. Update <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">ADMIN_API_KEY</code> in your server <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">.env</code>, restart the server, and reconnect above.
                For production, rotate this key frequently or move to a more robust auth strategy.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
