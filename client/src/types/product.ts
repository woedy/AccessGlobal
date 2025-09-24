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
    price: 2.99,
    category: 'apparel',
    images: [
      '/assets/store/access-tshirt-1.png',
      '/assets/store/access-tshirt-1.png' // Using the same image as placeholder for back
    ],
    variants: [
      {
        id: '1-black-s',
        name: 'Black / Small',
        price: 2.99,
        stock: 25,
        sku: 'AG-TS-BLK-S',
        color: 'Black',
        size: 'S'
      },
      {
        id: '1-black-m',
        name: 'Black / Medium',
        price: 2.99,
        stock: 30,
        sku: 'AG-TS-BLK-M',
        color: 'Black',
        size: 'M'
      },
      {
        id: '1-black-l',
        name: 'Black / Large',
        price: 2.99,
        stock: 20,
        sku: 'AG-TS-BLK-L',
        color: 'Black',
        size: 'L'
      },
      {
        id: '1-white-s',
        name: 'White / Small',
        price: 2.99,
        stock: 25,
        sku: 'AG-TS-WHT-S',
        color: 'White',
        size: 'S'
      },
      {
        id: '1-white-m',
        name: 'White / Medium',
        price: 2.99,
        stock: 30,
        sku: 'AG-TS-WHT-M',
        color: 'White',
        size: 'M'
      },
      {
        id: '1-white-l',
        name: 'White / Large',
        price: 2.99,
        stock: 20,
        sku: 'AG-TS-WHT-L',
        color: 'White',
        size: 'L'
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
    price: 2.99,
    category: 'apparel',
    images: [
      '/assets/store/Hoodie.png',
      '/assets/store/Hoodie.png' // Using the same image as placeholder for back
    ],
    variants: [
      {
        id: '2-black-s',
        name: 'Black / Small',
        price: 2.99,
        stock: 20,
        sku: 'AG-HD-BLK-S',
        color: 'Black',
        size: 'S'
      },
      {
        id: '2-black-m',
        name: 'Black / Medium',
        price: 2.99,
        stock: 25,
        sku: 'AG-HD-BLK-M',
        color: 'Black',
        size: 'M'
      },
      {
        id: '2-black-l',
        name: 'Black / Large',
        price: 2.99,
        stock: 25,
        sku: 'AG-HD-BLK-L',
        color: 'Black',
        size: 'L'
      },
      {
        id: '2-white-s',
        name: 'White / Small',
        price: 2.99,
        stock: 20,
        sku: 'AG-HD-WHT-S',
        color: 'White',
        size: 'S'
      },
      {
        id: '2-white-m',
        name: 'White / Medium',
        price: 2.99,
        stock: 25,
        sku: 'AG-HD-WHT-M',
        color: 'White',
        size: 'M'
      },
      {
        id: '2-white-l',
        name: 'White / Large',
        price: 2.99,
        stock: 25,
        sku: 'AG-HD-WHT-L',
        color: 'White',
        size: 'L'
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
    price: 2.99,
    category: 'accessories',
    images: [
      '/assets/store/Cup.png',
      '/assets/store/Cup.png' // Using the same image as placeholder for back
    ],
    variants: [
      {
        id: '3-black-s',
        name: 'Black / Small',
        price: 2.99,
        stock: 30,
        sku: 'AG-MG-BLK-S',
        color: 'Black',
        size: 'S'
      },
      {
        id: '3-black-m',
        name: 'Black / Medium',
        price: 2.99,
        stock: 30,
        sku: 'AG-MG-BLK-M',
        color: 'Black',
        size: 'M'
      },
      {
        id: '3-black-l',
        name: 'Black / Large',
        price: 2.99,
        stock: 30,
        sku: 'AG-MG-BLK-L',
        color: 'Black',
        size: 'L'
      },
      {
        id: '3-white-s',
        name: 'White / Small',
        price: 2.99,
        stock: 30,
        sku: 'AG-MG-WHT-S',
        color: 'White',
        size: 'S'
      },
      {
        id: '3-white-m',
        name: 'White / Medium',
        price: 2.99,
        stock: 30,
        sku: 'AG-MG-WHT-M',
        color: 'White',
        size: 'M'
      },
      {
        id: '3-white-l',
        name: 'White / Large',
        price: 2.99,
        stock: 30,
        sku: 'AG-MG-WHT-L',
        color: 'White',
        size: 'L'
      }
    ],
    featured: false,
    inStock: true,
    rating: 4.2,
    numReviews: 5,
    createdAt: '2025-03-05T00:00:00Z',
    updatedAt: '2025-03-05T00:00:00Z'
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

