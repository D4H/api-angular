import { ActivityType, Attendance, AttendanceStatus } from '../models';
import { DateParameter, Response, Search } from './shared.api';

/**
 * GET /team/attendance
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamAttendance
 */

export interface Search extends Search {
  activity?: ActivityType;
  activity_id?: number;
  after?: DateParameter;
  before?: DateParameter;
  include_archived?: boolean;
  member?: number | 'me';
  role_id?: number;
  status?: AttendanceStatus;
}

export interface Index extends Response<Array<Attendance>> {}

/**
 * GET /team/attendance/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamAttendanceAttendance_id
 */

export interface Show extends Response<Attendance> {}

/**
 * POST /team/attendance
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/postTeamAttendance
 */

export interface New {
  activity_id: number;
  date?: DateParameter;
  enddate?: DateParameter;
  member: number;
  role_id?: number;
  status: AttendanceStatus;
}

export interface Create extends Response<Attendance> {}

/**
 * PUT /team/attendance/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamAttendanceAttendance_id
 */

export interface Change {
  date?: DateParameter;
  enddate?: DateParameter;
  role_id?: number;
  status?: AttendanceStatus;
}

export interface Update extends Response<Attendance> {}

/**
 * DELETE /team/attendance/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamAttendanceAttendance_id
 */

export type Destroy = undefined;
