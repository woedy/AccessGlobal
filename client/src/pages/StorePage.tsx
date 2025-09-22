import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { Product, mockProducts } from '../types/product';
import { fetchProducts } from '@/services/productService';

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setLoading(true);
      try {
        const liveProducts = await fetchProducts();
        if (!isMounted) return;
        if (Array.isArray(liveProducts) && liveProducts.length) {
          setProducts(liveProducts);
          setUsingFallback(false);
          setError(null);
        } else {
          setProducts(mockProducts);
          setUsingFallback(true);
          setError('Live catalog is empty. Showing sample items for now.');
        }
      } catch (err) {
        console.error('Failed to load products:', err);
        if (!isMounted) return;
        setProducts(mockProducts);
        setUsingFallback(true);
        setError('We could not reach the store catalog. Showing saved items so you can keep browsing.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const fromProducts = products.map(p => p.category || 'uncategorized');
    return ['all', ...Array.from(new Set(fromProducts))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Access Global Store
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Support our mission with every purchase. 100% of proceeds go towards our programs.
          </p>
          {error && (
            <p className="mt-4 text-sm text-amber-700 bg-amber-100 inline-block px-3 py-2 rounded-md">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse space-y-4">
                <div className="aspect-square w-full rounded-lg bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} fallback={usingFallback} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg shadow p-10">
            <h2 className="text-xl font-semibold text-gray-900">No products in this category yet</h2>
            <p className="mt-2 text-gray-500">Check back soon or browse another category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, fallback }: { product: Product; fallback?: boolean }) {
  const { addToCart } = useCart();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const firstAvailableVariant = Array.isArray(product.variants) && product.variants.length
      ? product.variants.find(variant => variant.stock === undefined || variant.stock > 0) || product.variants[0]
      : undefined;

    addToCart(product, firstAvailableVariant ?? undefined);

    if (fallback) {
      console.warn('Added fallback product. Live inventory may not be available.');
    }
  };

  return (
    <Link href={`/store/${product.slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
          onError={(event) => {
            const target = event.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x800/1e3a8a/white?text=Image+Not+Found';
          }}
        />
        {!product.inStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900">Out of Stock</span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="mb-4 rounded-full bg-amber-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200 transform hover:scale-105"
            >
              ADD TO CART
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
        <p className="mt-1 text-lg font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        {product.rating && (
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <svg
                  key={rating}
                  className={`h-4 w-4 ${
                    rating < Math.floor(product.rating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {product.numReviews} review{product.numReviews !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
