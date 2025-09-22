const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, 'orders.json');

function toNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

class OrderDatabase {
  constructor() {
    this.orders = [];
    this.loadOrders();
  }

  async loadOrders() {
    try {
      const data = await fs.readFile(DB_FILE, 'utf8');
      this.orders = JSON.parse(data);
    } catch (error) {
      this.orders = [];
      await this.saveOrders();
    }
  }

  async saveOrders() {
    try {
      await fs.writeFile(DB_FILE, JSON.stringify(this.orders, null, 2));
    } catch (error) {
      console.error('Failed to save orders:', error);
    }
  }

  async createOrder(orderData = {}) {
    const timestamp = new Date().toISOString();
    const emailHistory = Array.isArray(orderData.emailHistory) ? orderData.emailHistory : [];
    const fulfillmentHistory = Array.isArray(orderData.fulfillmentHistory) ? orderData.fulfillmentHistory : [];

    const summaryItems = Array.isArray(orderData.summary?.items) ? orderData.summary.items : [];
    const summarySubtotal = toNumber(orderData.summary?.subtotal, toNumber(orderData.total, 0));
    const summaryNotes = orderData.summary?.notes !== undefined ? orderData.summary.notes : (orderData.notes ?? null);

    const order = {
      id: uuidv4(),
      status: orderData.status || 'pending',
      deliveryStatus: orderData.deliveryStatus || 'pending',
      currency: orderData.currency || 'usd',
      total: toNumber(orderData.total, 0),
      items: Array.isArray(orderData.items) ? orderData.items : [],
      summary: {
        items: summaryItems,
        subtotal: summarySubtotal,
        notes: summaryNotes,
      },
      customer: orderData.customer || null,
      notes: orderData.notes || null,
      stripeSessionId: orderData.stripeSessionId || null,
      checkoutUrl: orderData.checkoutUrl || null,
      stripeCustomerId: orderData.stripeCustomerId || null,
      paymentIntentId: orderData.paymentIntentId || null,
      amount_total: orderData.amount_total !== undefined ? toNumber(orderData.amount_total, 0) : undefined,
      metadata: orderData.metadata || {},
      shipping_details: orderData.shipping_details || null,
      customer_details: orderData.customer_details || null,
      delivery: orderData.delivery || null,
      fulfillmentHistory,
      emailHistory,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.orders.push(order);
    await this.saveOrders();
    return clone(order);
  }

  async getOrder(id) {
    const order = this.orders.find(entry => entry.id === id);
    return clone(order);
  }

  async updateOrder(id, updates = {}) {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return null;

    const existing = this.orders[index];
    const now = new Date().toISOString();

    const next = {
      ...existing,
      ...updates,
      updatedAt: now,
    };

    if (updates.total !== undefined) {
      next.total = toNumber(updates.total, existing.total);
    }

    if (updates.amount_total !== undefined) {
      next.amount_total = toNumber(updates.amount_total, existing.amount_total ?? existing.total);
    }

    if (updates.summary) {
      next.summary = {
        items: Array.isArray(updates.summary.items) ? updates.summary.items : existing.summary?.items || [],
        subtotal: updates.summary.subtotal !== undefined
          ? toNumber(updates.summary.subtotal, existing.summary?.subtotal || 0)
          : existing.summary?.subtotal || 0,
        notes: updates.summary.notes !== undefined
          ? updates.summary.notes
          : existing.summary?.notes ?? null,
      };
    } else if (!next.summary) {
      next.summary = existing.summary || { items: [], subtotal: 0, notes: null };
    } else if (next.summary && next.summary.notes === undefined) {
      next.summary.notes = existing.summary?.notes ?? null;
    }

    if (updates.customer) {
      next.customer = {
        ...(existing.customer || {}),
        ...updates.customer,
      };
    }

    next.deliveryStatus = updates.deliveryStatus || next.deliveryStatus || 'pending';

    if (updates.emailHistory) {
      next.emailHistory = Array.isArray(updates.emailHistory)
        ? updates.emailHistory
        : existing.emailHistory || [];
    } else if (!Array.isArray(next.emailHistory)) {
      next.emailHistory = existing.emailHistory || [];
    }

    if (updates.fulfillmentHistory) {
      next.fulfillmentHistory = Array.isArray(updates.fulfillmentHistory)
        ? updates.fulfillmentHistory
        : existing.fulfillmentHistory || [];
    } else if (!Array.isArray(next.fulfillmentHistory)) {
      next.fulfillmentHistory = existing.fulfillmentHistory || [];
    }

    this.orders[index] = next;
    await this.saveOrders();
    return clone(next);
  }

  async getOrdersByCustomer(customerId) {
    const orders = this.orders.filter(order => order.customer && order.customer.id === customerId);
    return clone(orders);
  }

  async getOrderByStripeSession(sessionId) {
    const order = this.orders.find(entry => entry.stripeSessionId === sessionId);
    return clone(order);
  }

  async getAllOrders() {
    return clone(this.orders);
  }
}

module.exports = new OrderDatabase();

