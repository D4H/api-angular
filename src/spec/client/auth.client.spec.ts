import faker from 'faker';
import { TestBed } from '@angular/core/testing';

import { AuthClient, MissingTokenError } from '../../lib/client';
import { Config, routes } from '../../lib/providers';
import { ClientTestModule, Factory } from '../../testing';

describe('AuthClient', () => {
  let bearer: { Authorization: string };
  let client: AuthClient;
  let config: Config;
  let url: string;

  beforeEach(() => {
    config = Factory.build<Config>('Config');

    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    client = TestBed.get(AuthClient);
    url = `/${faker.random.uuid()}/${faker.random.uuid()}`;
  });

  it('should be created', () => {
    expect(client).toBeTruthy();
  });

  describe('bearerToken', () => {
    it('should have bearerToken accessor', () => {
      expect(typeof client.bearerToken).toBe('function');
    });

    it('should return undefined when URL is not authenticated', () => {
      expect(client.bearerToken(config.tokens, url)).toBe(undefined);
    });

    it('should try to return the options header when URL is authenticated', () => {
      const headers = { Authorization: `Bearer ${faker.random.uuid()}` };
      config.tokens.team = undefined;
      url = routes.account.memberships;
      bearer = client.bearerToken(config.tokens, url, { headers });
      expect(bearer).toEqual(headers);
    });

    it('should return bearer header when URL is authenticated and token can be set', () => {
      url = routes.account.memberships;
      bearer = client.bearerToken(config.tokens, url);
      expect(bearer).toEqual({ Authorization: `Bearer ${config.tokens.account}` });
    });

    it('should throw an error when URL is authenticated and no token can be set', () => {
      config.tokens.account = undefined;
      url = routes.account.memberships;

      expect(() => client.bearerToken(config.tokens, url))
        .toThrow(new MissingTokenError(url));
    });
  });
});
