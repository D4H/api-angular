import faker from 'faker';
import isIsoDate from 'is-iso-date';
import moment from 'moment';
import { TestBed } from '@angular/core/testing';

import { ClientConfig } from '../../lib/providers';
import { ConfigureApiModule } from '../../test';
import { API_URL_REGEX, ApiUrl } from '../utilities';
import { Factory } from '../factories';
import { ParserClient } from '../../lib/client';

describe('ParserClient', () => {
  let client: ParserClient;
  let config: ClientConfig;
  let path: string;

  beforeEach(() => {
    config = Factory.build<ClientConfig>('ClientConfig');
    ConfigureApiModule(TestBed, config);
    client = TestBed.get(ParserClient);
  });

  it('should be created', () => {
    expect(client).toBeTruthy();
  });

  describe('ParserClient#url', () => {
    beforeEach(() => {
      path = `/${faker.random.objectElement()}/${faker.random.objectElement()}`;
    });

    it('should have #url accessor', () => {
      expect(typeof client.url).toBe('function');
    });

    it('should generate a URL matching comparative output', () => {
      expect(client.url(config, path)).toEqual(ApiUrl(config, path));
    });

    it('should generate a URL matching test regex', () => {
      expect(API_URL_REGEX.test(client.url(config, path))).toBe(true);
    });
  });

  describe('ApiHttpClient#options', () => {
    it('should have #options accessor', () => {
      expect(typeof client.options).toBe('function');
    });

    it('should set x-source-* headers', () => {
      const { headers } = client.options(config, '');
      expect(headers['x-source-client']).toEqual(config.client.name);
      expect(headers['x-source-version']).toEqual(config.client.version);
    });

    it('should stringify parameter Date() and moment() objects into an ISO string format', () => {
      const options: object = {
        params: {
          [faker.random.objectElement()]: new Date(),
          [faker.random.objectElement()]: moment()
        }
      };

      const { params } = client.options(config, '', options);
      Object.values(params).forEach(value => expect(isIsoDate(value)).toBe(true));
    });
  });
});
