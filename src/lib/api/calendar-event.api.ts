import { CalendarEvent } from '../models';
import { DateParameter, Response, Search } from './shared.api';

/**
 * GET Calendar Events
 * =============================================================================
 * Hand-derived intersection of duty Query and attendance Query interfaces.
 *
 * @see https://api.d4h.org/v2/documentation#operation/getTeamAttendance
 * @see https://api.d4h.org/v2/documentation#operation/getTeamDuties
 */

export interface Search extends Search {
  after?: DateParameter;
  before?: DateParameter;
  member?: number;
  role_id?: number;
}

export interface Index extends Response<Array<CalendarEvent>> {}
