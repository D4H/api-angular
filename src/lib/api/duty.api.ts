import { DateParameter, Query as Search, Response } from './shared.api';
import { Duty, DutyType } from '../models';

/**
 * GET /team/duties
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamDuties
 */

export interface Query extends Search {
  after?: DateParameter;
  before?: DateParameter;
  id?: number;
  member?: number | 'me';
  role_id?: number;
  type?: DutyType;
}

export interface Index extends Response<Array<Duty>> {}

/**
 * GET /team/duties/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamDutiesDuty_id
 */

export interface Show extends Response<Duty> {}

/**
 * POST /team/duties
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/postTeamDuties
 */

export interface New {
  end_date: DateParameter;
  member: number;
  notes?: string;
  role_id?: number;
  start_date: DateParameter;
  type: DutyType;
}

export interface Create extends Response<Duty> {}

/**
 * PUT /team/duties/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamDutiesDuty_id
 */

export interface Change {
  start_date?: DateParameter;
  end_date?: DateParameter;
  role_id?: number;
  notes?: string;
}

export interface Update extends Response<Duty> {}

/**
 * DELETE /team/duties/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamDutiesDuty_id
 */

export type Destroy = undefined;
