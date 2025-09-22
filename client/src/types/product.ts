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
      '/assets/store/access-tshirt-1.png',
      '/assets/store/access-tshirt-1.png' // Using the same image as placeholder for back
    ],
    variants: [
      {
        id: '1-1',
        name: 'Small',
        price: 29.99,
        stock: 10,
        sku: 'AG-TS-S',
        color: 'Black',
        size: 'S'
      },
      {
        id: '1-2',
        name: 'Medium',
        price: 29.99,
        stock: 15,
        sku: 'AG-TS-M',
        color: 'Black',
        size: 'M'
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
    price: 59.99,
    category: 'apparel',
    images: [
      '/assets/store/Hoodie.png',
      '/assets/store/Hoodie.png' // Using the same image as placeholder for back
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
    price: 19.99,
    category: 'accessories',
    images: [
      '/assets/store/Cup.png',
      '/assets/store/Cup.png' // Using the same image as placeholder for back
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
  isOpen: boolean;
}

