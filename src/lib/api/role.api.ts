import { Query as Search, Response } from './shared.api';
import { Role } from '../models';

/**
 * GET /team/roles
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamRoles
 */

// tslint:disable-next-line no-empty-interface
export interface Query extends Search {}

export interface Index extends Response<Array<Role>> {}

/**
 * GET /team/roles/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamRolesRole
 */

export interface Show extends Response<Role> {}
