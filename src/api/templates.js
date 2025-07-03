import client from './client';

export function listTemplates() {
  return client.get('/templates');
}
