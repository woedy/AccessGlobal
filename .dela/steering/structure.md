# Project Structure

## Repository Organization

This is a modern web application with a React frontend and Node.js backend:

```
├── .dela/                          # DELA configuration and steering
├── client/                         # Frontend React application
├── server/                         # Backend Node.js API
└── public/                         # Static assets and public files
```

## Frontend Application Structure

The frontend follows a modern React + TypeScript + Vite structure:

```
├── public/                         # Static assets
│   └── assets/                     # Images, fonts, and other media
├── src/
│   ├── components/                 # Reusable UI components
│   ├── pages/                      # Page components
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions and API clients
│   ├── styles/                     # Global styles and theme
│   ├── types/                      # TypeScript type definitions
│   ├── App.tsx                     # Main application component
│   └── main.tsx                    # Application entry point
├── .gitignore
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build configuration
```

## Backend Structure

Node.js backend follows a modular structure:

```
server/
├── config/                        # Configuration files
├── controllers/                   # Route controllers
├── middleware/                    # Custom middleware
├── models/                        # Database models
├── routes/                        # API route definitions
├── services/                      # Business logic
├── utils/                         # Helper functions
├── app.js                         # Express application setup
└── server.js                      # Server entry point
```

## Key Configuration Files

### Frontend
- **tailwind.config.ts**: Tailwind CSS theming and customization
- **tsconfig.json**: TypeScript configuration
- **vite.config.ts**: Build and development server configuration
- **.eslintrc.js**: Code quality and style rules
- **.prettierrc**: Code formatting rules

### Backend
- **.env**: Environment variables
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration

## Development Conventions

### File Naming
- React components: PascalCase (e.g., `UserProfile.tsx`)
- Utility files: camelCase (e.g., `apiClient.ts`)
- Page components: PascalCase matching route names
- Test files: `*.test.tsx` or `*.spec.tsx`

### Import Organization
1. External libraries (React, etc.)
2. Internal components
3. Hooks and utilities
4. Relative imports (use `@/` alias for `src/`)
5. Style imports

### Component Structure
- Functional components with TypeScript
- Separate presentation and logic
- Use custom hooks for complex state
- Follow accessibility best practices
- Implement responsive design

### State Management
- React Context for global state
- Custom hooks for data fetching
- Type all API responses and props
