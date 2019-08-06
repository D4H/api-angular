import { Account, Membership, MembershipType, Username } from '../models';
import { Response } from './shared.res';

/**
 * POST /account/authenticate
 * =============================================================================
 * Authenticate with the API via username and password.
 *
 * @see https://api.d4h.org/v2/documentation#operation/postAccountAuthenticate
 */

export interface Authenticate extends Response<Account> {}

/**
 * GET /account/memberships
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getAccountMemberships
 */

export interface Search {
  list_modules?: boolean;
  type?: MembershipType;
}

export interface Memberships {
  meta: object;
  statusCode: number;

  data: {
    documents: Array<Membership>;
  };
}

/**
 * GET /account/username
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getAccountUsername
 */

export interface Username extends Response<Username> {}
