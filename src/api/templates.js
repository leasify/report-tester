import client from './client';

export function getTemplates() {
  return client.get('/templates');
}
