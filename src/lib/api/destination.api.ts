import { DateParameter, Response, Search } from './shared.api';
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

export interface Search extends Search {
  type?: DestinationType;
}

export interface Index extends Response<Array<Destination>> {}
