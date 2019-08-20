import faker from 'faker';

import { API_URL_REGEX, ApiUrl, Factory } from '../../testing';
import { Config } from '../../lib/providers';

describe('ApiUrl', () => {
  let config: Config;
  let path: string;
  let url: string;

  beforeEach(() => {
    config = Factory.build<Config>('Config');
    path = `/${faker.random.uuid()}/${faker.random.uuid()}`,
    url = new URL(`/${config.version}${path}`, `https://${config.region}`).toString();
  });

  it('should generate an appropriate API URL without parameters', () => {
    expect(ApiUrl(config, path)).toEqual(url);
  });

  it('should generate an appropriate API URL with parameters', () => {
    const params = { [faker.random.uuid()]: faker.random.uuid() };
    url = `${url}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
    expect(ApiUrl(config, path, params)).toEqual(url);
  });

  it('should generate an appropriate URL matching test regex', () => {
    expect(API_URL_REGEX.test(ApiUrl(config, path))).toBe(true);
  });
});
