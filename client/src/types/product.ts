export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku?: string;
  image?: string;
  color?: string;
  size?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Base price
  category: string;
  images: string[];
  variants?: ProductVariant[];
  featured: boolean;
  inStock: boolean;
  rating?: number;
  numReviews?: number;
  stock?: number;
  sku?: string;
  metadata?: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}

// Example mock data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Access Global T-Shirt',
    slug: 'access-global-t-shirt',
    description: 'Comfortable cotton t-shirt with Access Global logo',
    price: 29.99,
    category: 'apparel',
    images: [
      '/assets/store_items/T-Shirt white.png',
      '/assets/store_items/T-Shirt Black.png'
    ],
    variants: [
      {
        id: '1-white-s',
        name: 'White / Small',
        price: 29.99,
        stock: 25,
        sku: 'AG-TS-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/T-Shirt white.png'
      },
      {
        id: '1-white-m',
        name: 'White / Medium',
        price: 29.99,
        stock: 30,
        sku: 'AG-TS-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/T-Shirt white.png'
      },
      {
        id: '1-white-l',
        name: 'White / Large',
        price: 29.99,
        stock: 20,
        sku: 'AG-TS-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/T-Shirt white.png'
      },
      {
        id: '1-black-s',
        name: 'Black / Small',
        price: 29.99,
        stock: 25,
        sku: 'AG-TS-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/T-Shirt Black.png'
      },
      {
        id: '1-black-m',
        name: 'Black / Medium',
        price: 29.99,
        stock: 30,
        sku: 'AG-TS-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/T-Shirt Black.png'
      },
      {
        id: '1-black-l',
        name: 'Black / Large',
        price: 29.99,
        stock: 20,
        sku: 'AG-TS-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/T-Shirt Black.png'
      }
    ],
    featured: true,
    inStock: true,
    rating: 4.5,
    numReviews: 12,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Access Global Hoodie',
    slug: 'access-global-hoodie',
    description: 'Warm and cozy hoodie with embroidered logo',
    price: 29.99,
    category: 'apparel',
    images: [
      '/assets/store_items/Hoodie Girl white.png',
      '/assets/store_items/Hoodie Girl Black.png'
    ],
    variants: [
      {
        id: '2-white-s',
        name: 'White / Small',
        price: 29.99,
        stock: 20,
        sku: 'AG-HD-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/Hoodie Girl white.png'
      },
      {
        id: '2-white-m',
        name: 'White / Medium',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/Hoodie Girl white.png'
      },
      {
        id: '2-white-l',
        name: 'White / Large',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/Hoodie Girl white.png'
      },
      {
        id: '2-black-s',
        name: 'Black / Small',
        price: 29.99,
        stock: 20,
        sku: 'AG-HD-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/Hoodie Girl Black.png'
      },
      {
        id: '2-black-m',
        name: 'Black / Medium',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/Hoodie Girl Black.png'
      },
      {
        id: '2-black-l',
        name: 'Black / Large',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/Hoodie Girl Black.png'
      }
    ],
    featured: true,
    inStock: true,
    rating: 4.8,
    numReviews: 8,
    createdAt: '2025-02-10T00:00:00Z',
    updatedAt: '2025-02-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'Access Global Mug',
    slug: 'access-global-mug',
    description: 'Ceramic mug with Access Global design',
    price: 29.99,
    category: 'accessories',
    images: [
      '/assets/store_items/Mug White.png',
      '/assets/store_items/Mug Black.png'
    ],
    variants: [
      {
        id: '3-white-s',
        name: 'White / Small',
        price: 29.99,
        stock: 30,
        sku: 'AG-MG-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/Mug White.png'
      },
      {
        id: '3-white-m',
        name: 'White / Medium',
        price: 29.99,
        stock: 30,
        sku: 'AG-MG-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/Mug White.png'
      },
      {
        id: '3-white-l',
        name: 'White / Large',
        price: 29.99,
        stock: 30,
        sku: 'AG-MG-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/Mug White.png'
      },
      {
        id: '3-black-s',
        name: 'Black / Small',
        price: 29.99,
        stock: 30,
        sku: 'AG-MG-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/Mug Black.png'
      },
      {
        id: '3-black-m',
        name: 'Black / Medium',
        price: 29.99,
        stock: 30,
        sku: 'AG-MG-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/Mug Black.png'
      },
      {
        id: '3-black-l',
        name: 'Black / Large',
        price: 29.99,
        stock: 30,
        sku: 'AG-MG-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/Mug Black.png'
      }
    ],
    featured: false,
    inStock: true,
    rating: 4.2,
    numReviews: 5,
    createdAt: '2025-03-05T00:00:00Z',
    updatedAt: '2025-03-05T00:00:00Z'
  },
  {
    id: '4',
    name: 'Access Global Classic Hoodie',
    slug: 'access-global-classic-hoodie',
    description: 'Classic pullover hoodie featuring the Access Global crest and soft brushed interior.',
    price: 29.99,
    category: 'apparel',
    images: [
      '/assets/store_items/Hoodie Boy White.png',
      '/assets/store_items/Hoodie Boy Black.png'
    ],
    variants: [
      {
        id: '4-white-s',
        name: 'White / Small',
        price: 29.99,
        stock: 20,
        sku: 'AG-HD-CLS-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/Hoodie Boy White.png'
      },
      {
        id: '4-white-m',
        name: 'White / Medium',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-CLS-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/Hoodie Boy White.png'
      },
      {
        id: '4-white-l',
        name: 'White / Large',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-CLS-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/Hoodie Boy White.png'
      },
      {
        id: '4-black-s',
        name: 'Black / Small',
        price: 29.99,
        stock: 20,
        sku: 'AG-HD-CLS-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/Hoodie Boy Black.png'
      },
      {
        id: '4-black-m',
        name: 'Black / Medium',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-CLS-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/Hoodie Boy Black.png'
      },
      {
        id: '4-black-l',
        name: 'Black / Large',
        price: 29.99,
        stock: 25,
        sku: 'AG-HD-CLS-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/Hoodie Boy Black.png'
      }
    ],
    featured: false,
    inStock: true,
    rating: 4.6,
    numReviews: 10,
    createdAt: '2025-02-20T00:00:00Z',
    updatedAt: '2025-02-20T00:00:00Z'
  },
  {
    id: '5',
    name: "Access Global Men's Jacket",
    slug: 'access-global-mens-jacket',
    description: "Weather-ready men's jacket with embroidered Access Global patch and zip pockets.",
    price: 29.99,
    category: 'outerwear',
    images: [
      '/assets/store_items/Jacket Boy White.png',
      '/assets/store_items/Jacket Boy Black.png'
    ],
    variants: [
      {
        id: '5-white-s',
        name: 'White / Small',
        price: 29.99,
        stock: 18,
        sku: 'AG-JK-MNS-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/Jacket Boy White.png'
      },
      {
        id: '5-white-m',
        name: 'White / Medium',
        price: 29.99,
        stock: 22,
        sku: 'AG-JK-MNS-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/Jacket Boy White.png'
      },
      {
        id: '5-white-l',
        name: 'White / Large',
        price: 29.99,
        stock: 20,
        sku: 'AG-JK-MNS-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/Jacket Boy White.png'
      },
      {
        id: '5-black-s',
        name: 'Black / Small',
        price: 29.99,
        stock: 18,
        sku: 'AG-JK-MNS-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/Jacket Boy Black.png'
      },
      {
        id: '5-black-m',
        name: 'Black / Medium',
        price: 29.99,
        stock: 22,
        sku: 'AG-JK-MNS-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/Jacket Boy Black.png'
      },
      {
        id: '5-black-l',
        name: 'Black / Large',
        price: 29.99,
        stock: 20,
        sku: 'AG-JK-MNS-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/Jacket Boy Black.png'
      }
    ],
    featured: true,
    inStock: true,
    rating: 4.7,
    numReviews: 7,
    createdAt: '2025-02-25T00:00:00Z',
    updatedAt: '2025-02-25T00:00:00Z'
  },
  {
    id: '6',
    name: "Access Global Women's Jacket",
    slug: 'access-global-womens-jacket',
    description: "Tailored women's jacket with sleek lines and an Access Global emblem on the chest.",
    price: 29.99,
    category: 'outerwear',
    images: [
      '/assets/store_items/Jacket Girl white.png',
      '/assets/store_items/Jacket Girl Black.png'
    ],
    variants: [
      {
        id: '6-white-s',
        name: 'White / Small',
        price: 29.99,
        stock: 18,
        sku: 'AG-JK-WNS-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/Jacket Girl white.png'
      },
      {
        id: '6-white-m',
        name: 'White / Medium',
        price: 29.99,
        stock: 22,
        sku: 'AG-JK-WNS-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/Jacket Girl white.png'
      },
      {
        id: '6-white-l',
        name: 'White / Large',
        price: 29.99,
        stock: 20,
        sku: 'AG-JK-WNS-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/Jacket Girl white.png'
      },
      {
        id: '6-black-s',
        name: 'Black / Small',
        price: 29.99,
        stock: 18,
        sku: 'AG-JK-WNS-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/Jacket Girl Black.png'
      },
      {
        id: '6-black-m',
        name: 'Black / Medium',
        price: 29.99,
        stock: 22,
        sku: 'AG-JK-WNS-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/Jacket Girl Black.png'
      },
      {
        id: '6-black-l',
        name: 'Black / Large',
        price: 29.99,
        stock: 20,
        sku: 'AG-JK-WNS-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/Jacket Girl Black.png'
      }
    ],
    featured: false,
    inStock: true,
    rating: 4.9,
    numReviews: 11,
    createdAt: '2025-02-28T00:00:00Z',
    updatedAt: '2025-02-28T00:00:00Z'
  },
  {
    id: '7',
    name: 'Access Global Socks',
    slug: 'access-global-socks',
    description: 'Cozy rib-knit socks featuring the Access Global emblem at the cuff.',
    price: 19.99,
    category: 'accessories',
    images: [
      '/assets/store_items/Socks White.png',
      '/assets/store_items/Socks Black.png'
    ],
    variants: [
      {
        id: '7-white-s',
        name: 'White / Small',
        price: 19.99,
        stock: 40,
        sku: 'AG-SK-WHT-S',
        color: 'White',
        size: 'S',
        image: '/assets/store_items/Socks White.png'
      },
      {
        id: '7-white-m',
        name: 'White / Medium',
        price: 19.99,
        stock: 45,
        sku: 'AG-SK-WHT-M',
        color: 'White',
        size: 'M',
        image: '/assets/store_items/Socks White.png'
      },
      {
        id: '7-white-l',
        name: 'White / Large',
        price: 19.99,
        stock: 35,
        sku: 'AG-SK-WHT-L',
        color: 'White',
        size: 'L',
        image: '/assets/store_items/Socks White.png'
      },
      {
        id: '7-black-s',
        name: 'Black / Small',
        price: 19.99,
        stock: 40,
        sku: 'AG-SK-BLK-S',
        color: 'Black',
        size: 'S',
        image: '/assets/store_items/Socks Black.png'
      },
      {
        id: '7-black-m',
        name: 'Black / Medium',
        price: 19.99,
        stock: 45,
        sku: 'AG-SK-BLK-M',
        color: 'Black',
        size: 'M',
        image: '/assets/store_items/Socks Black.png'
      },
      {
        id: '7-black-l',
        name: 'Black / Large',
        price: 19.99,
        stock: 35,
        sku: 'AG-SK-BLK-L',
        color: 'Black',
        size: 'L',
        image: '/assets/store_items/Socks Black.png'
      }
    ],
    featured: true,
    inStock: true,
    rating: 4.4,
    numReviews: 6,
    createdAt: '2025-03-10T00:00:00Z',
    updatedAt: '2025-03-10T00:00:00Z'
  }
];

// Type for cart item
export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
}

// Type for cart state
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  bundleDiscount: number;
  isOpen: boolean;
}

