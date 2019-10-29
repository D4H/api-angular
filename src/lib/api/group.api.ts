import { DateParameter, Response, Search } from './shared.api';
import { Group } from '../models';

/**
 * GET /team/groups
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamGroups
 */

export interface Search extends Search {
  id?: number;
  title?: string;
}

export interface Index extends Response<Array<Group>> {}

/**
 * GET /team/groups/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamGroupsGroup_id
 */

export interface Show extends Response<Group> {}