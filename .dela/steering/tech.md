# Technology Stack

## Frontend Application
Modern, performant frontend built with:

### Core Technologies
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible components
- **Framer Motion** for animations

### Key Libraries
- **React Query** for server state management
- **React Hook Form** with **zod** for form validation
- **Axios** for HTTP requests
- **date-fns** for date manipulation
- **react-i18next** for internationalization
- **react-helmet-async** for SEO management

### Development Tools
- **ESLint** with TypeScript and React plugins
- **Prettier** for code formatting
- **Husky** with lint-staged for pre-commit hooks
- **Vitest** for unit testing
- **Cypress** for E2E testing

## Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Nodemailer** for email notifications
- **Stripe** for donation processing
- **AWS S3** for file storage

## Common Commands

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Preview production build
npm run preview
```

### Backend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Apply database migrations
npm run db:migrate

# Generate database migration
npm run db:make-migration
```

## Project Structure
- **client/**: Frontend React application
- **server/**: Backend Node.js API
- **public/**: Static assets and public files

## Development Environment
- **Node.js** v18+ with npm
- **MongoDB** for database
- **Git** for version control
- **VS Code** recommended with ESLint and Prettier extensions
- **Docker** for containerization (optional)
- **Postman** or **Insomnia** for API testing
