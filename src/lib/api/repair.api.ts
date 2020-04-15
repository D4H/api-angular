import { DateParameter, Query as Search, Response } from './shared.api';
import { LocationType, Repair, RepairCause, RepairStatus } from '../models';

/**
 * GET /team/repairs
 * =============================================================================
 * Search location_id can be a number or LocationType per clarification by
 * @tdtm:
 *
 * > "Either an int location Id or 'all' or 'outbox' etc
 * > Documentation generator doesn't support the all, we'd need to specify it in
 * > the text description
 *
 * @see https://api.d4h.org/v2/documentation#operation/getTeamRepairs
 */

export interface Query extends Search {
  equipment_id?: number;
  fund_id?: number;
  id?: number;
  location_id?: LocationType;
  member_id?: number;
  status?: RepairStatus;
}

export interface Index extends Response<Array<Repair>> {}

/**
 * GET /team/repairs/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamRepairsRepair_id
 */

export interface Show extends Response<Repair> {}

/**
 * POST /team/repairs
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/postTeamRepairs
 */

export interface New {
  activity_id?: number;
  caused_by?: RepairCause;
  date_due?: DateParameter;
  description?: string;
  equipment_id: number;
  member_id?: number;
  repair_cost?: number;
  status?: RepairStatus;
  title: string;
}

export interface Create extends Response<Repair> {}

/**
 * PUT /team/repairs/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamRepairsRepair_id
 */

export interface Change {
  activity_id?: number;
  caused_by?: RepairCause;
  date_due?: DateParameter;
  description?: string;
  member_id?: number;
  repair_cost?: number;
  status?: RepairStatus;
  title?: string;
}

export interface Update extends Response<Repair> {}
