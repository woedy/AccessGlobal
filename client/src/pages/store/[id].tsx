import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'wouter';
import { useCart } from '../../contexts/CartContext';
import { Product, mockProducts } from '../../types/product';
import { fetchProductBySlug } from '@/services/productService';

const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [variantError, setVariantError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const { addToCart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadProduct = async () => {
      if (!params?.id) {
        setError('No product specified');
        setLoading(false);
        return;
      }
      setLoading(true);
      setVariantError(null);
      try {
        const fetched = await fetchProductBySlug(params.id);
        if (!isMounted) return;
        setProduct(fetched);
        setUsingFallback(false);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        if (!isMounted) return;
        const fallbackProduct = mockProducts.find(p => p.slug === params.id) || null;
        setProduct(fallbackProduct);
        setUsingFallback(true);
        setError(fallbackProduct ? 'Showing saved details while we reconnect to the catalog.' : 'Product not found');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [params?.id]);

  useEffect(() => {
    if (!product || !Array.isArray(product.variants) || product.variants.length === 0) {
      setSelectedVariantId(null);
      return;
    }
    const firstAvailableVariant = product.variants.find(variant => variant.stock === undefined || variant.stock > 0);
    setSelectedVariantId((firstAvailableVariant || product.variants[0]).id);
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null;
    return product.variants.find(variant => variant.id === selectedVariantId) || null;
  }, [product, selectedVariantId]);

  const displayPrice = product ? selectedVariant?.price ?? product.price : 0;
  const canAddToCart = Boolean(
    product &&
    product.inStock !== false &&
    (!product.variants?.length || (selectedVariant && (selectedVariant.stock === undefined || selectedVariant.stock > 0)))
  );

  const handleAddToCart = () => {
    if (!product) return;
    if (product.variants?.length && !selectedVariant) {
      setVariantError('Please choose an option before adding to cart.');
      return;
    }
    addToCart(product, selectedVariant ?? undefined);
    setVariantError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="aspect-square bg-gray-200 rounded-lg" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-3 text-gray-500">We couldn't locate this item. It may have been moved or is temporarily unavailable.</p>
          <div className="mt-6">
            <a
              href="/store"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Back to Store
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                onError={(event) => {
                  const target = event.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x800/1e3a8a/white?text=Image+Not+Found';
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              {product.name}
              {usingFallback && (
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Offline copy</span>
              )}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{formatCurrency(displayPrice)}</p>
              {selectedVariant?.sku && (
                <p className="mt-1 text-sm text-gray-500">SKU: {selectedVariant.sku}</p>
              )}
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Choose an option</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map(variant => {
                    const isSelected = variant.id === selectedVariantId;
                    const outOfStock = variant.stock !== undefined && variant.stock <= 0;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => {
                          if (outOfStock) return;
                          setSelectedVariantId(variant.id);
                          setVariantError(null);
                        }}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50 text-amber-700'
                            : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                        } ${outOfStock ? 'cursor-not-allowed opacity-60' : ''}`}
                      >
                        {variant.name}
                        {variant.price !== product.price && ` · ${formatCurrency(variant.price)}`}
                        {outOfStock ? ' (Out of stock)' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{product.description}</p>
              </div>
              {error && (
                <p className="mt-4 text-sm text-amber-700">{error}</p>
              )}
              {variantError && (
                <p className="mt-2 text-sm text-red-600">{variantError}</p>
              )}
            </div>

            <div className="mt-6">
              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className={`w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform ${
                    canAddToCart
                      ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 hover:scale-[1.02]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAddToCart
                    ? `ADD TO CART - ${formatCurrency(displayPrice)}`
                    : 'OUT OF STOCK'}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <li className="text-gray-400">
                  <span className="text-gray-600">100% of proceeds support our programs</span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">High-quality materials</span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">Ethically sourced</span>
                </li>
                {product.sku && (
                  <li className="text-gray-400">
                    <span className="text-gray-600">SKU: {product.sku}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
