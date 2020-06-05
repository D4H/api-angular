import { Query as Search, Response } from './shared.api';
import { Destination, DestinationType } from '../models';

/**
 * GET Decisions
 * =============================================================================
 * For by query (foo AND bar) or text query search.
 *
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipment
 * @see https://api.d4h.org/v2/documentation#operation/getTeamLocations
 * @see https://api.d4h.org/v2/documentation#operation/getTeamMembers
 */

export interface Query extends Search {
  type?: DestinationType;
}

export interface Index extends Response<Array<Destination>> {}
