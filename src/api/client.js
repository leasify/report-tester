import axios from 'axios';

// Allow overriding the API base URL using an environment variable. If none is
// provided, default to Leasify's production API.
const apiBase =
  (import.meta.env && import.meta.env.API_BASE_URL) ||
  (typeof process !== 'undefined' ? process.env.API_BASE_URL : undefined) ||
  'https://app.leasify.se/api/v3';

const client = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
