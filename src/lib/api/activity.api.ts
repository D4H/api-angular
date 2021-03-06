import { Activity, ActivityType } from '../models';
import { DateParameter, Query as Search, Response } from './shared.api';

/**
 * GET /team/activities
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamActivities
 */

export interface Query extends Search {
  after?: DateParameter;
  before?: DateParameter;
  include_archived?: boolean;
  published?: boolean;
  type?: ActivityType;
}

export interface Index extends Response<Array<Activity>> {}

/**
 * GET /team/activities/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamActivitiesActivity_id
 */

export interface Show extends Response<Activity> {}
