import MockAdapter from 'axios-mock-adapter';
import client from './client.js';
import { login } from './auth.js';

describe('login', () => {
  it('includes device_name when VITE_DEVICE_NAME is set', async () => {
    process.env.VITE_DEVICE_NAME = 'MyDevice';
    const mock = new MockAdapter(client);
    mock.onPost('/login').reply(200, { token: 'ok' });

    await login('user', 'pass');
    const request = mock.history.post[0];
    expect(JSON.parse(request.data)).toEqual({
      email: 'user',
      password: 'pass',
      device_name: 'MyDevice',
    });

    mock.restore();
    delete process.env.VITE_DEVICE_NAME;
  });

  it('omits device_name when VITE_DEVICE_NAME is not set', async () => {
    const mock = new MockAdapter(client);
    mock.onPost('/login').reply(200, { token: 'ok' });

    await login('user', 'pass');
    const request = mock.history.post[0];
    expect(JSON.parse(request.data)).toEqual({
      email: 'user',
      password: 'pass',
    });

    mock.restore();
  });
});
