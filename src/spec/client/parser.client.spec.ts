import faker from 'faker';
import moment from 'moment';
import { Factory } from '@d4h/testing';
import { TestBed } from '@angular/core/testing';

import { API_URL_REGEX, ApiUrl } from '../../lib/tools';
import { ClientTestModule } from '../client-test.module';
import { Config, defaultConfig } from '../../lib/providers';
import { ParserClient } from '../../lib/client';

describe('ParserClient', () => {
  let client: ParserClient;
  let config: Config;
  let path: string;

  beforeEach(() => {
    config = Factory.build<Config>('Config');

    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    client = TestBed.get(ParserClient);
  });

  it('should be created', () => {
    expect(client).toBeTruthy();
  });

  describe('url', () => {
    beforeEach(() => {
      path = `/${faker.random.uuid()}/${faker.random.uuid()}`;
    });

    it('should have url accessor', () => {
      expect(typeof client.url).toBe('function');
      expect(client.url.length).toBe(2);
    });

    it('should generate a URL matching comparative output', () => {
      expect(client.url(config, path)).toEqual(ApiUrl(config, path));
    });

    it('should generate a URL matching test regex', () => {
      expect(API_URL_REGEX.test(client.url(config, path))).toBe(true);
    });

    it('should use defaultConfig.version when the config.version is undefined', () => {
      config.version = undefined;
      const result: string = new URL(client.url(config, path)).pathname;
      expect(result.startsWith(`/${defaultConfig.version}`)).toBe(true);
    });
  });

  describe('options', () => {
    it('should have options accessor', () => {
      expect(typeof client.options).toBe('function');
      expect(client.options.length).toBe(2);
    });

    it('should set x-source-* headers', () => {
      const { headers } = client.options(config, '');
      expect(headers['x-source-client']).toBe(config.client.name);
      expect(headers['x-source-version']).toBe(config.client.version);
    });

    it('should stringify parameter Date() and moment() objects into an ISO string format', () => {
      const options: object = {
        params: {
          [faker.random.uuid()]: new Date(),
          [faker.random.uuid()]: moment()
        }
      };

      const { params } = client.options(config, '', options);
      Object.values(params).forEach(value => expect(typeof value).toBe('string'));
    });

    it('should use defaultConfig.client when config.client is undefined', () => {
      config.client = undefined;
      const { headers } = client.options(config, '');
      expect(headers['x-source-client']).toBe(defaultConfig.client.name);
      expect(headers['x-source-version']).toBe(defaultConfig.client.version);
    });

    it('should merge options.headers', () => {
      const options = {
        headers: {
          'x-foo': 'bar',
          'x-bar': 'foo'
        }
      };

      const { headers } = client.options(config, '', options);
      expect(headers['x-foo']).toBe('bar');
      expect(headers['x-bar']).toBe('foo');
    });
  });
});
