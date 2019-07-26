import faker from 'faker';

import { API_URL_REGEX, ApiUrl, Factory } from '../../testing';
import { ClientConfig } from '../../lib/providers';

describe('ApiUrl', () => {
  let config: ClientConfig;
  let path: string;
  let url: string;

  beforeEach(() => {
    config = Factory.build<ClientConfig>('ClientConfig');
    path = `/${faker.random.objectElement()}/${faker.random.objectElement()}`,
    url = new URL(`/${config.version}${path}`, `https://${config.region}`).toString();
  });

  it('should generate an appropriate API URL without parameters', () => {
    expect(ApiUrl(config, path)).toEqual(url);
  });

  it('should generate an appropriate API URL with parameters', () => {
    const params = { [faker.random.objectElement()]: faker.random.objectElement() };
    url = `${url}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
    expect(ApiUrl(config, path, params)).toEqual(url);
  });

  it('should generate an appropriate URL matching test regex', () => {
    expect(API_URL_REGEX.test(ApiUrl(config, path))).toBe(true);
  });
});
