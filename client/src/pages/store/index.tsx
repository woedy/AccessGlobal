import { useState } from 'react';
import { mockProducts } from '../../types/product';
import { Product } from '../../types/product';
import Link from 'next/link';

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];
  
  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

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
        </div>

        {/* Category Filter */}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/store/${product.slug}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-700">{product.name}</h3>
        <div className="mt-1 text-lg font-medium text-gray-900">
          ${product.price.toFixed(2)}
          {!product.inStock && (
            <span className="ml-2 text-sm text-red-500">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
