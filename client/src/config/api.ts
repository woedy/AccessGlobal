export const API_BASE =
  (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');

export const api = (endpoint: string) =>
  `${API_BASE}/${endpoint.replace(/^\//, '')}`;