import { CalendarEvent } from '../models';
import { IsoDate } from '../models';
import { Query as Search, Response } from './shared.api';

/**
 * GET Calendar Events
 * =============================================================================
 * Hand-derived intersection of duty Query and attendance Query interfaces.
 *
 * @see https://api.d4h.org/v2/documentation#operation/getTeamAttendance
 * @see https://api.d4h.org/v2/documentation#operation/getTeamDuties
 */

export interface Query extends Search {
  after?: IsoDate;
  before?: IsoDate;
  member?: number | 'me';
  role_id?: number;
}

export interface Index extends Response<Array<CalendarEvent>> {}
