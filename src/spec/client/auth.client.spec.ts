import faker from 'faker';
import { TestBed } from '@angular/core/testing';

import { AuthClient, MissingTokenError } from 'bindings/lib/client';
import { ClientConfig, routes } from 'bindings/lib/providers';
import { ClientTestModule, Factory } from 'bindings/testing';

// FIXME: Enable this!
xdescribe('AuthClient', () => {
  let bearer: { Authorization: string };
  let client: AuthClient;
  let config: ClientConfig;
  let url: string;

  beforeEach(() => {
    config = Factory.build<ClientConfig>('ClientConfig');

    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    client = TestBed.get(AuthClient);
    url = `/${faker.random.objectElement()}/${faker.random.objectElement()}`;
  });

  it('should be created', () => {
    expect(client).toBeTruthy();
  });

  describe('AuthClient#bearerToken', () => {
    it('should have #bearerToken accessor', () => {
      expect(typeof client.bearerToken).toBe('function');
    });

    it('should return undefined when URL is not authenticated', () => {
      expect(client.bearerToken(config.tokens, url)).toBe(undefined);
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
