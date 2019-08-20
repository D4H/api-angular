import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  API_AUTHENTICATED_ROUTES,
  AuthenticatedRoute,
  ClientRequestAuth,
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
 *  2. If token required, try to fetch it.
 *  3. If token exists, set it as bearer header.
 *  4. If unable to fetch token, throw error.
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

  bearerToken(tokens: Tokens, url: string): { Authorization: string } {
    const tokenType: TokenType = this.tokenType(url);

    if (tokenType) {
      const token: string = this.getToken(tokens, tokenType);

      if (token) {
        return { Authorization: `Bearer ${token}` };
      } else {
        throw new MissingTokenError(url);
      }
    } else {
      return undefined;
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

  private getToken(tokens: Tokens, tokenType: TokenType): string {
    switch (tokenType) {
      case TokenType.Account: {
        return tokens.account;
      }

      case TokenType.Team: {
        return tokens.team;
      }

      case TokenType.Organisation: {
        return tokens.organisation;
      }

      default: {
        return undefined;
      }
    }
  }
}
