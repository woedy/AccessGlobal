// API Configuration for Next.js
export const API_CONFIG = {
  // Update this to your Django backend URL
  BASE_URL: 'https://your-django-backend.com/api',
  
  // You can also set this via environment variable in your .env.local file:
  // NEXT_PUBLIC_API_URL=https://your-django-backend.com/api
  // Then uncomment the line below:
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://your-django-backend.com/api',
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 