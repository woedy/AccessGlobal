// API Configuration for Next.js
export const API_CONFIG = {
  // Update this to your Express backend URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 