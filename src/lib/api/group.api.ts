import { Query as Search, Response } from './shared.api';
import { Group } from '../models';

/**
 * GET /team/groups
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamGroups
 */

export interface Query extends Search {
  id?: number;
  member_id?: number;
  title?: string;
}

export interface Index extends Response<Array<Group>> {}

/**
 * GET /team/groups/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamGroupsGroup_id
 */

export interface Show extends Response<Group> {}
