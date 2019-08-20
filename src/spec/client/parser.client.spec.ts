import faker from 'faker';
import moment from 'moment';
import traverse from 'traverse';
import { TestBed } from '@angular/core/testing';

import { API_URL_REGEX, ApiUrl, ClientTestModule, Factory } from '../../testing';
import { Config } from '../../lib/providers';
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
  });

  describe('options', () => {
    it('should have options accessor', () => {
      expect(typeof client.options).toBe('function');
      expect(client.options.length).toBe(2);
    });

    it('should set x-source-* headers', () => {
      const { headers } = client.options(config, '');
      expect(headers['x-source-client']).toEqual(config.client.name);
      expect(headers['x-source-version']).toEqual(config.client.version);
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
  });
});
