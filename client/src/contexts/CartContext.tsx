import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ProductVariant } from '../types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant | null) => void;
  removeFromCart: (productId: string, variantId?: string | null) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string | null) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  subtotal: number;
  bundleDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'access_global_cart';

type StoredCart = CartItem[];

const readStoredCart = (): StoredCart => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to read cart from storage:', error);
    return [];
  }
};

const writeStoredCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn('Failed to persist cart to storage:', error);
  }
};

const matchesLine = (item: CartItem, productId: string, variantId?: string | null) => {
  const normalizedVariantId = variantId ?? null;
  const itemVariantId = item.selectedVariant?.id ?? null;
  return item.id === productId && itemVariantId === normalizedVariantId;
};

const getUnitPrice = (item: CartItem) => item.selectedVariant?.price ?? item.price;

const BUNDLE_PAIR_PRICE = 50;

const collectUnitPrices = (items: CartItem[]) => {
  const unitPrices: number[] = [];
  for (const item of items) {
    const price = getUnitPrice(item);
    for (let i = 0; i < item.quantity; i += 1) {
      unitPrices.push(price);
    }
  }
  return unitPrices;
};

const calculateBundleDiscount = (items: CartItem[]) => {
  const unitPrices = collectUnitPrices(items);
  if (unitPrices.length < 2) return 0;

  const originalTotal = unitPrices.reduce((sum, price) => sum + price, 0);
  unitPrices.sort((a, b) => b - a);

  const pairCount = Math.floor(unitPrices.length / 2);
  let adjustedTotal = pairCount * BUNDLE_PAIR_PRICE;
  if (unitPrices.length % 2 === 1) {
    adjustedTotal += unitPrices[unitPrices.length - 1];
  }

  const adjustment = Number((originalTotal - adjustedTotal).toFixed(2));
  return Object.is(adjustment, -0) ? 0 : adjustment;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const removeFromCart = (productId: string, variantId?: string | null) => {
    setItems(prev => prev.filter(item => !matchesLine(item, productId, variantId)));
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string | null) => {
    setItems(prev => {
      if (quantity < 1) {
        return prev.filter(item => !matchesLine(item, productId, variantId));
      }
      return prev.map(item =>
        matchesLine(item, productId, variantId)
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => setItems([]);

  const addToCart = (product: Product, variant?: ProductVariant | null) => {
    const variantId = variant?.id ?? null;
    setItems(prev => {
      const existing = prev.find(item => matchesLine(item, product.id, variantId));
      if (existing) {
        return prev.map(item =>
          matchesLine(item, product.id, variantId)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const nextItem: CartItem = {
        ...product,
        quantity: 1,
        selectedVariant: variant ? { ...variant } : undefined,
      };
      return [...prev, nextItem];
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Number(
    items.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0).toFixed(2)
  );
  const bundleDiscount = calculateBundleDiscount(items);
  const totalPriceRaw = Number((subtotal - bundleDiscount).toFixed(2));
  const totalPrice = Object.is(totalPriceRaw, -0) ? 0 : totalPriceRaw;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        subtotal,
        bundleDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
