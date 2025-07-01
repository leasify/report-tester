import client from './client';

export function ping() {
  return client.get('/ping');
}

// Log in with email and password. The API will return a token that can be stored
// in localStorage and used as a bearer token for subsequent requests.
export function login(email, password) {
  const deviceName = import.meta?.env?.VITE_DEVICE_NAME || process.env.VITE_DEVICE_NAME;
  const payload = { email, password };
  if (deviceName) payload.device_name = deviceName;
  return client.post('/login', payload);
}
