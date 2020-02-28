import { DateParameter, Response, Search } from './shared.api';
import { Inspection, Interval } from '../models';

/**
 * GET /team/inspections
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspections
 */

export interface Search extends Search {
  equipment_id?: number;
  item_id?: number; // Inspection result ID.
  kinds_id?: number;
  location_id?: number;
  team_id?: number;
}

export interface Index extends Response<Array<Inspection>> {}

/**
 * GET /team/inspections/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspectionsInspection_id
 */

export interface Show extends Response<Inspection> {}

/**
 * PUT /team/inspections/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamInspectionsInspection_id
 */

export interface Change {
  active?: boolean;
  all_kinds?: boolean;
  description?: string;
  gear_parent_id?: number;
  interval_unit?: Interval;
  interval_value?: number;
  location_id?: number;
  member_id?: number;
  reminder_unit?: Interval;
  reminder_value?: number;
  title?: string;
}

export interface Update extends Response<Inspection> {}
