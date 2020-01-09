import { Response, Search } from './shared.api';
import { Location } from '../models';

/**
 * GET /team/locations
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamLocations
 */

export interface Search extends Search {
  equipment_id?: number;
  id?: number;
  team_id?: number;
  title?: string;
}

export interface Index extends Response<Array<Location>> {}

/**
 * GET /team/locations/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamLocationsLocation_id
 */

export interface Show extends Response<Location> {}

/**
 * DELETE /team/locations/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamLocationsLocation_id
 */

export type Destroy = undefined;
