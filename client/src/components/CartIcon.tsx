import { ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { useCart } from '../contexts/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="group -m-2 flex items-center p-2">
      <div className="relative">
        <ShoppingCart
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-medium text-white">
            {totalItems}
          </span>
        )}
      </div>
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        Cart
      </span>
    </Link>
  );
}
