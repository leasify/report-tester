import MockAdapter from 'axios-mock-adapter';
import client from './client.js';
import { login } from './auth.js';

describe('login', () => {
  it('includes device_name when DEVICE_NAME is set', async () => {
    process.env.DEVICE_NAME = 'MyDevice';
    const mock = new MockAdapter(client);
    mock.onPost('/login').reply(200, { bearer: 'ok' });

    await login('user', 'pass');
    const request = mock.history.post[0];
    expect(JSON.parse(request.data)).toEqual({
      email: 'user',
      password: 'pass',
      device_name: 'MyDevice',
    });

    mock.restore();
    delete process.env.DEVICE_NAME;
  });

  it('uses ACME as device_name when DEVICE_NAME is not set', async () => {
    const mock = new MockAdapter(client);
    mock.onPost('/login').reply(200, { bearer: 'ok' });

    await login('user', 'pass');
    const request = mock.history.post[0];
    expect(JSON.parse(request.data)).toEqual({
      email: 'user',
      password: 'pass',
      device_name: 'ACME',
    });

    mock.restore();
  });
});
