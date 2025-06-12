import client from './client';

export const ping = () => client.get('/ping');
