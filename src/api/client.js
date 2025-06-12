import axios from 'axios';

// Allow overriding the API base URL using an environment variable. If none is
// provided, default to Leasify's production API.
const client = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || 'https://app.leasify.se/api/v3',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
