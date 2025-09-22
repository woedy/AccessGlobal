# Access Global Foundation

A static website for Access Global Foundation, built with React, TypeScript, and Vite.

## Features

- Modern React application with TypeScript
- Responsive design with Tailwind CSS
- Client-side routing with Wouter
- Beautiful UI components with Radix UI
- Optimized for Vercel deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project now ships with a combined frontend + backend deployment flow suitable for platforms such as **Coolify** (or any Node hosting provider).

### Coolify / Container Deployment

1. **Build command**: `npm run build`
   - Runs the Vite production build
   - Automatically copies the generated assets into `server/public`
2. **Start command**: `npm start`
   - Boots the Express API (`server/index.js`) and serves the built frontend
3. **Environment variables** (configure in Coolify):
   - `PORT` – optional, defaults to `3002`
   - `CLIENT_URL` – public URL of the deployed site (used for redirects + asset URLs)
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `ADMIN_API_KEY`
   - Email/NOWPayments related keys as needed (`SMTP_*`, `NOWPAYMENTS_*`, etc.)

Coolify users can either rely on the provided `nixpacks.toml` (Buildpack → Nixpacks) or build via Docker. The configuration installs dependencies, builds the frontend, verifies that `server/public/index.html` exists, and finally starts the Node server.

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # App entry point
│   └── index.html         # HTML template
├── attached_assets/        # Static assets
├── dist/                  # Build output (generated)
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── vercel.json           # Vercel deployment configuration
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Wouter** - Client-side routing
- **Radix UI** - Accessible UI components
- **Framer Motion** - Animations