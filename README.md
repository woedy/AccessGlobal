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

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically build and deploy your site.

The build process:
1. Runs `npm run build` to create a production build
2. Serves the static files from the `dist` directory
3. Handles client-side routing with proper rewrites

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