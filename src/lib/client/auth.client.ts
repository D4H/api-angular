import { Inject, Injectable } from '@angular/core';

import {
  API_AUTHENTICATED_ROUTES,
  AuthenticatedRoute,
  ClientRequestAuth,
  HttpOptions,
  TokenType,
  Tokens
} from '../providers';

import { ClientModule } from '../client.module';

/**
 * D4H API Authentication
 * =============================================================================
 * API requests are signed with an approprate bearer token. This service
 * determines the appropriate token based on the passed configuration and path.
 * Populates appropriate token if required by the API, based on config and URL.
 *
 *  1. Determine if route is authenticated.
 *  2. If token required, check whether the appropriate header has already been
 *     set in options. TeamService and PhotoService#membership both require
 *     this, because their methods employ the token of the passed team.
 *  3. Else if token required, try to fetch it.
 *  4. If token exists, set it as bearer header.
 *  5. If unable to fetch token, throw error.
 */

export class MissingTokenError extends Error {
  constructor(url: string) {
    super(`No bearer token available for request to ${url}`);
  }
}

@Injectable({ providedIn: ClientModule })
export class AuthClient implements ClientRequestAuth {
  constructor(
    @Inject(API_AUTHENTICATED_ROUTES) private readonly routes: Array<AuthenticatedRoute>
  ) {}

  bearerToken(tokens: Tokens, url: string, options: HttpOptions = {}): { Authorization: string } {
    const tokenType: TokenType = this.tokenType(url);
    const headers: any = options.headers;

    if (tokenType) {
      if (headers && headers.Authorization) {
        return { Authorization: headers.Authorization };
      } else {
        const token: string = this.getToken(tokens, tokenType);

        if (token) {
          return { Authorization: `Bearer ${token}` };
        } else {
          throw new MissingTokenError(url);
        }
      }
    } else {
      return undefined;
    }
  }

  getToken(tokens: Tokens, tokenType: TokenType): string {
    switch (tokenType) {
      case TokenType.Account: {
        return tokens.account;
      }

      case TokenType.Organisation: {
        return tokens.organisation;
      }

      case TokenType.Team: {
        return tokens.team;
      }

      default: {
        return undefined;
      }
    }
  }

  private tokenType(url: string): TokenType {
    const foundRoute: AuthenticatedRoute = this.routes.find(
      (authRoute: AuthenticatedRoute) => authRoute.match.test(url)
    );

    if (foundRoute) {
      return foundRoute.token;
    } else {
      return undefined;
    }
  }
}
