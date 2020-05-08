import { Query as Search, Response } from './shared.api';
import { EntityType, SearchResult } from '../models';

/**
 * GET /team/duties
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamSearch
 */

export interface Query extends Search {
  entity_type?: EntityType;
  query?: string;
}

export interface Index extends Response<Array<SearchResult>> {}
