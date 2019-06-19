import { Setting, SettingData, Team } from '../models';
import { Response } from './general.route';

/**
 * GET /team/teams/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeam
 */

export interface Show extends Response<Team> {}

/**
 * GET /team/settings?setting=MODULE_FOO
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamSettings
 */

export interface Setting extends Response<SettingData> {}
