import { DateParameter, Query as Search, Response } from './shared.api';
import { Result, ResultStatus } from '../models';

/**
 * GET /team/inspection-results
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspectionresults
 */

export interface Query extends Search {
  completed?: boolean;
  equipment_id?: number;
  id?: number;
  inspection_id?: number;
}

export interface Index extends Response<Array<Result>> {}

/**
 * GET /team/inspection-results/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamInspectionresultsId
 */

export interface Show extends Response<Result> {}

/**
 * PUT /team/inspection-results/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamInspectionresultsId
 */

export interface Change {
  date_completed?: DateParameter;
  description?: string;
  status?: ResultStatus;
}

export interface Update extends Response<Result> {}
