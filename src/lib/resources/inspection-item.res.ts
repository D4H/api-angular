import { DateParameter, Response, Search } from './shared.res';

import {
  InspectionInterval,
  InspectionItem,
  InspectionResult,
  LocationType
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

export interface Index extends Response<Array<InspectionItem>> {}

/**
 * GET /team/inspections/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspectionsInspection_idItemsItem_id
 */

export interface Show extends Response<InspectionItem> {}

/**
 * PUT /team/inspections/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamInspectionsInspection_idItemsItem_id
 */

export interface Change {
  date_completed?: DateParameter;
  description?: string;
  status?: InspectionResult;
}

export interface Update extends Response<InspectionItem> {}
