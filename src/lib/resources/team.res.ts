import { Response } from './shared.res';
import { Setting, SettingData, Team } from '../models';

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
