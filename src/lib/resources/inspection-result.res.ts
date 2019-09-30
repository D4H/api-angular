import { DateParameter, Response, Search } from './shared.res';

import {
  InspectionInterval,
  ResultStatus,
  LocationType,
  Result
} from '../models';

/**
 * GET /team/inspections
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspectionsInspection_idItems
 */

export interface Search extends Search {
  completed?: boolean;
  location_id?: LocationType;
}

export interface Index extends Response<Array<Result>> {}

/**
 * GET /team/inspections/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspectionsInspection_idItemsItem_id
 */

export interface Show extends Response<Result> {}

/**
 * PUT /team/inspections/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamInspectionsInspection_idItemsItem_id
 */

export interface Change {
  date_completed?: DateParameter;
  description?: string;
  status?: ResultStatus;
}

export interface Update extends Response<Result> {}
