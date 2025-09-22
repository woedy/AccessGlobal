import { api } from '@/config/api';
import { Product } from '@/types/product';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(api('store/products'));
  return handleResponse<Product[]>(response);
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(api(`store/products/${id}`));
  return handleResponse<Product>(response);
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(api(`store/products/slug/${slug}`));
  return handleResponse<Product>(response);
}

export async function upsertProduct(product: Partial<Product>, adminKey: string) {
  const hasId = Boolean(product.id);
  const endpoint = hasId ? `store/products/${product.id}` : 'store/products';
  const method = hasId ? 'PUT' : 'POST';
  const response = await fetch(api(endpoint), {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey,
    },
    body: JSON.stringify(product),
  });
  return handleResponse<Product>(response);
}

export async function deleteProduct(id: string, adminKey: string) {
  const response = await fetch(api(`store/products/${id}`), {
    method: 'DELETE',
    headers: {
      'x-admin-key': adminKey,
    },
  });
  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || `Failed to delete product (${response.status})`);
  }
  return true;
}
