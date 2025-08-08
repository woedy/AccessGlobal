# Overview

This is a static React website for Access Global Foundation, a non-profit organization dedicated to empowering communities through global access to education, resources, and sustainable development opportunities. The website features the foundation's new brand tagline "The World is Yours" and showcases four main program areas: Global Education Initiatives, Environmental Empowerment, Economic Access & Entrepreneurship, and Health & Wellness Access.

**Current Status**: Converted to static-only website for local development and deployment to static hosting platforms like Vercel, Netlify, or GitHub Pages.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Radix UI components with Tailwind CSS styling using the shadcn/ui design system
- **State Management**: No external state management needed for static content
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

## Static Website Architecture
- **Type**: Pure client-side React application
- **No Backend**: All server-side code removed for static hosting
- **Data**: No database - content is static within components
- **Forms**: Contact and donation forms are presentational (would need external service integration)
- **Development**: Vite dev server for local development

## Project Structure
- **Monorepo Layout**: Shared code between client and server
- **Client**: React application in `/client` directory
- **Server**: Express API in `/server` directory  
- **Shared**: Common types and schemas in `/shared` directory
- **Build Output**: Client builds to `/dist/public`, server builds to `/dist`

## Development Features
- **Error Handling**: Runtime error overlay for development
- **Logging**: Custom request logging middleware
- **Type Safety**: Full TypeScript coverage across client, server, and shared code
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)

## UI Components
- **Component Library**: Comprehensive shadcn/ui component set including forms, navigation, data display, and feedback components
- **Theming**: CSS custom properties for consistent design tokens
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Icons**: Font Awesome integration for iconography
- **Typography**: Inter font family for modern, accessible text

# Local Development

## Running Locally (Windows)
To run this website locally without Express.js:

### Option 1: Command Line
```bash
npx vite client --port 3000 --open
```

### Option 2: Batch Script
Double-click `run-local.bat` or run in Command Prompt

### Option 3: PowerShell
Run `.\run-local.ps1` in PowerShell

The website will open at http://localhost:3000

## Building for Production
```bash
npx vite build client --outDir ../dist
```

# External Dependencies (Removed)

## Previously Used (Now Removed for Static Version)
- **Neon Database**: Removed - no backend needed
- **Express.js**: Removed - static hosting only
- **TanStack Query**: Removed - no API calls needed

## UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library built on Radix + Tailwind
- **Font Awesome**: Icon library for UI elements

## Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Production bundling for server code
- **PostCSS**: CSS processing with Autoprefixer
- **Replit**: Integration for Replit development environment

## Form Handling
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration with validation libraries
- **Zod**: Schema validation (via drizzle-zod)

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **class-variance-authority**: Component variant management
- **nanoid**: Unique ID generation