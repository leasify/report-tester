import client from './client';

export function ping() {
  return client.get('/ping');
}

// Log in with email and password. The API will return a token that can be stored
// in localStorage and used as a bearer token for subsequent requests.
export function login(email, password) {
  return client.post('/login', { email, password });
}
