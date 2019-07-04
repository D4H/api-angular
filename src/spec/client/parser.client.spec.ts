import faker from 'faker';
import isIsoDate from 'is-iso-date';
import moment from 'moment';
import traverse from 'traverse';
import { TestBed } from '@angular/core/testing';

import { API_URL_REGEX, ApiUrl, ClientTestModule, Factory } from 'bindings/testing';
import { ClientConfig } from 'bindings/lib/providers';
import { ParserClient } from 'bindings/lib/client';

describe('ParserClient', () => {
  let client: ParserClient;
  let config: ClientConfig;
  let path: string;

  beforeEach(() => {
    config = Factory.build<ClientConfig>('ClientConfig');
    client = TestBed.get(ParserClient);

    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });
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
      expect(client.url.length).toBe(2);
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
      expect(client.options.length).toBe(3);
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

  describe('ApiHttpClient#response', () => {
    it('should have #response accessor', () => {
      expect(typeof client.response).toBe('function');
      expect(client.options.length).toBe(3);
    });

    it('should cast ISO-formatted strings as Date objects', () => {
      const response = {
        data: {
          [faker.random.objectElement()]: new Date().toISOString(),
          [faker.random.objectElement()]: new Date().toISOString(),
          [faker.random.objectElement()]: new Date().toISOString(),
          [faker.random.objectElement()]: new Date().toISOString()
        }
      };

      const dateified = traverse(response).map(function(value: any): void {
        if (isIsoDate(value)) {
          this.update(new Date(value), true);
        }
      });

      expect(client.response(response)).toEqual(dateified);
    });

    it('should not perform any actions on non-object responses', () => {
      const naughtyValues = [
        '',
        () => {},
        15.7,
        6,
        [],
        false,
        new Blob(['']),
        new File([''], '', {  type: 'image/png' }),
        null,
        undefined
      ];

      naughtyValues.forEach(val => expect(client.response(val)).toEqual(val));
    });
  });
});
