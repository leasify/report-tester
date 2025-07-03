import MockAdapter from 'axios-mock-adapter';
import client from './client.js';
import { getTemplates } from './templates.js';

describe('getTemplates', () => {
  it('requests /templates', async () => {
    const mock = new MockAdapter(client);
    mock.onGet('/templates').reply(200, [{ id: 1 }]);

    const res = await getTemplates();
    expect(res.data).toEqual([{ id: 1 }]);

    mock.restore();
  });
});
