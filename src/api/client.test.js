import MockAdapter from 'axios-mock-adapter';
import client from './client.js';

describe('axios client', () => {
  it('adds Authorization header when token exists', async () => {
    localStorage.setItem('token', 'my-token');
    const mock = new MockAdapter(client);
    mock.onGet('/test').reply(200);

    await client.get('/test');
    const request = mock.history.get[0];

    expect(request.headers.Authorization).toBe('Bearer my-token');

    mock.restore();
  });
});
