const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, 'products.json');

function generateSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

class ProductDatabase {
  constructor() {
    this.products = [];
    this.ready = this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(DB_FILE, 'utf8');
      this.products = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
    } catch (error) {
      this.products = [];
      await this.saveProducts();
    }
  }

  async saveProducts() {
    const payload = JSON.stringify(this.products, null, 2);
    await fs.writeFile(DB_FILE, payload);
  }

  async ensureReady() {
    if (this.ready) {
      await this.ready;
      this.ready = null;
    }
  }

  async getAllProducts() {
    await this.ensureReady();
    return this.products;
  }

  async getProductById(id) {
    await this.ensureReady();
    return this.products.find(product => product.id === id) || null;
  }

  async getProductBySlug(slug) {
    await this.ensureReady();
    return this.products.find(product => product.slug === slug) || null;
  }

  async createProduct(data) {
    await this.ensureReady();

    if (!data.name) {
      throw new Error('Product name is required');
    }

    const timestamp = new Date().toISOString();
    const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.name);

    if (this.products.some(product => product.slug === slug)) {
      throw new Error('A product with this slug already exists');
    }

    const product = {
      id: uuidv4(),
      name: data.name,
      slug,
      description: data.description || '',
      price: Number(data.price || 0),
      category: data.category || 'general',
      images: Array.isArray(data.images) ? data.images : [],
      variants: Array.isArray(data.variants) ? data.variants : [],
      featured: Boolean(data.featured),
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : true,
      rating: data.rating || null,
      numReviews: data.numReviews || 0,
      stock: data.stock ?? null,
      sku: data.sku || null,
      createdAt: timestamp,
      updatedAt: timestamp,
      metadata: data.metadata || {},
    };

    this.products.push(product);
    await this.saveProducts();
    return product;
  }

  async updateProduct(id, updates) {
    await this.ensureReady();
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return null;

    const current = this.products[index];
    let nextSlug = current.slug;

    if (updates.slug || updates.name) {
      const desired = updates.slug ? generateSlug(updates.slug) : generateSlug(updates.name || current.name);
      if (desired !== current.slug && this.products.some(product => product.slug === desired)) {
        throw new Error('A product with this slug already exists');
      }
      nextSlug = desired;
    }

    const nextProduct = {
      ...current,
      ...updates,
      slug: nextSlug,
      price: updates.price !== undefined ? Number(updates.price) : current.price,
      images: Array.isArray(updates.images) ? updates.images : current.images,
      variants: Array.isArray(updates.variants) ? updates.variants : current.variants,
      updatedAt: new Date().toISOString(),
    };

    this.products[index] = nextProduct;
    await this.saveProducts();
    return nextProduct;
  }

  async deleteProduct(id) {
    await this.ensureReady();
    const nextProducts = this.products.filter(product => product.id !== id);
    if (nextProducts.length === this.products.length) {
      return false;
    }
    this.products = nextProducts;
    await this.saveProducts();
    return true;
  }
}

module.exports = new ProductDatabase();
