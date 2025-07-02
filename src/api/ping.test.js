import MockAdapter from 'axios-mock-adapter';
import client from './client.js';
import { ping } from './auth.js';

describe('ping', () => {
  it('includes Authorization header when token exists', async () => {
    localStorage.setItem('token', 'my-token');
    const mock = new MockAdapter(client);
    mock.onGet('/ping').reply(200);

    await ping();
    const request = mock.history.get[0];
    expect(request.headers.Authorization).toBe('Bearer my-token');

    mock.restore();
  });
});
