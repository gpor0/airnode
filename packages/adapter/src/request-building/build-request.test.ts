import * as build from './build-request';
import * as fixtures from 'test/fixtures';

describe('buildingRequest', () => {
  it('builds and returns the request', () => {
    const options = fixtures.buildRequestOptions();
    const res = build.buildRequest(options);
    expect(res).toEqual({
      baseUrl: 'https://api.myapi.com',
      data: {
        access_key: 'super-secret-key',
        amount: '1',
        from: 'ETH',
        to: 'USD',
      },
      headers: {},
      method: 'get',
      path: '/convert',
    });
  });

  it('throws an error if the endpoint cannot be found', () => {
    expect.assertions(1);
    const ois = fixtures.buildOIS({ endpoints: [] });
    const options = fixtures.buildRequestOptions({ ois });
    try {
      build.buildRequest(options);
    } catch (e) {
      expect(e).toEqual(new Error("Endpoint: 'convertToUsd' not found in the OIS."));
    }
  });
});
