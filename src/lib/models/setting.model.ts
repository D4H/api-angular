/**
 * Enabled Team/Organisation Module Query
 * =============================================================================
 */

export type TeamSetting
 = 'MODULE_ACTIVITIES'
 | 'MODULE_ADDRESS_BOOK'
 | 'MODULE_API_ACCESS'
 | 'MODULE_APP_EQUIPMENT_ENTERPRISE'
 | 'MODULE_CALENDAR'
 | 'MODULE_CHARTS'
 | 'MODULE_COLLABORATION'
 | 'MODULE_COSTING'
 | 'MODULE_COURSES'
 | 'MODULE_DASHBOARD'
 | 'MODULE_DOCUMENTS'
 | 'MODULE_DUTY'
 | 'MODULE_EMERGENCY_CONTACTS'
 | 'MODULE_EQUIPMENT'
 | 'MODULE_EQUIPMENT_FUNDING'
 | 'MODULE_EQUIPMENT_INSPECTIONS'
 | 'MODULE_EQUIPMENT_REPAIRS'
 | 'MODULE_EQUIPMENT_TEAM_MOVE'
 | 'MODULE_EVENTS'
 | 'MODULE_EXERCISES'
 | 'MODULE_GROUPS'
 | 'MODULE_HAZMAT'
 | 'MODULE_INCIDENTS'
 | 'MODULE_LOST_BEHAVIOUR'
 | 'MODULE_MAPSAR'
 | 'MODULE_MEMBERS'
 | 'MODULE_OLD_COMMUNICATION'
 | 'MODULE_PERSONS_INVOLVED'
 | 'MODULE_REPORTS'
 | 'MODULE_RESOURCES'
 | 'MODULE_ROLES'
 | 'MODULE_TAGS'
 | 'MODULE_TASKS'
 | 'MODULE_UNIFIED_COMMUNICATION'
 | 'MODULE_VEHICLES_INVOLVED'
 | 'MODULE_WEATHER'
 | 'MODULE_WHITEBOARD';

/**
 * Enabled Team/Organisation Module Response
 * =============================================================================
 * Returned from:
 *
 *  * GET /organisation/settings?setting=MODULE_FOO
 *  * GET /team/settings?setting=MODULE_FOO
 */

export interface SettingData {
  module_name: TeamSetting;
  value: boolean;
}
