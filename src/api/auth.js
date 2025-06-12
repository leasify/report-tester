import client from './client';

export function ping() {
  return client.get('/ping');
}
