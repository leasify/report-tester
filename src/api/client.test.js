import MockAdapter from 'axios-mock-adapter';
import client, { setToken } from './client.js';

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

  it('setToken stores token and updates default header', () => {
    setToken('abc');
    expect(localStorage.getItem('token')).toBe('abc');
    expect(client.defaults.headers.common.Authorization).toBe('Bearer abc');

    setToken(null);
    expect(localStorage.getItem('token')).toBeNull();
    expect(client.defaults.headers.common.Authorization).toBeUndefined();
  });
});
