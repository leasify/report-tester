import client from './client';

export async function ping() {
  return client.get('/ping');
}
