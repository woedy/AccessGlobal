# AGENTS Guide for Access Global Store

## Mission
Provide a seamless shopping and donation experience for Access Global Foundation supporters. Maintain a reliable Stripe-backed checkout, timely communications, and lightweight admin tooling.

## Key Systems
- **Frontend**: React + TypeScript (Vite). Tailwind for styling, Wouter for routing.
- **Backend**: Node/Express under `server/index.js`. JSON files persist products (`products.json`) and orders (`orders.json`).
- **Payments**: Stripe Checkout. Store and donation flows reuse the same Stripe account.
- **Email**: Nodemailer via `server/email.js`. Supports donation receipts and store order confirmations.

## Critical Paths
1. **Storefront**: `/store` → cart → Stripe Checkout → `/order/success`.
2. **Admin Panel**: `/admin/store` (requires `ADMIN_API_KEY`). Allows CRUD for products and order status updates.
3. **Webhooks**: Stripe `checkout.session.completed` → `handleCheckoutCompleted` updates orders and sends receipts.

## Configuration Checklist
- `.env` must define `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `CLIENT_URL`, and `ADMIN_API_KEY` (plus SMTP fields for email).
- Optional: `STORE_SHIPPING_COUNTRIES` comma-separated ISO codes.
- Frontend expects `VITE_API_URL` when API not served from same origin.

## Operational Notes
- **Products**: Authoritative data lives server-side. Use admin panel or update `products.json` followed by restart.
- **Orders**: Stored in `server/orders.json`. Admin panel supports delivery status changes.
- **Emails**: `sendStoreOrderReceipt` guards against duplicates via order `emailHistory` entries.
- **Cart**: Persists in browser localStorage; customer contact info captured pre-checkout.

## Monitoring / Debugging
- Stripe events: check dashboard logs. Webhook logs surfaced in server console.
- Orders API:
  - `GET /api/orders/session/:id`
  - `GET /api/store/orders` (admin key only)
- Products API:
  - Public: `GET /api/store/products`, `GET /api/store/products/slug/:slug`
  - Admin: `POST/PUT/DELETE /api/store/products`

## Testing Tips
- Use Stripe test keys and card `4242 4242 4242 4242`.
- After local checkout, verify `orders.json` updated and email logged (or sent if SMTP configured).
- Admin panel actions mutate JSON files; ensure filesystem write permissions exist.
- Run `npm run dev` (frontend) and `node server/index.js` (backend) in parallel for full stack.

## Future Enhancements
- Authentication for admin beyond static key.
- Inventory & variant stock decrementation post-order.
- Automated fulfillment notifications and shipment tracking fields.
- Reporting exports (orders/products) for accounting.
