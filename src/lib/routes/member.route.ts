import { SafeUrl } from '@angular/platform-browser';

import { DateParameter, Response, Search } from './general.route';

import {
  DutyType,
  EmergencyContact,
  Group,
  Member,
  OperationalStatus,
  StatusLabel
} from '../models';

/**
 * Member ID Parameter
 * =============================================================================
 * A member identifier can be one of:
 *
 *  1. Number
 *  2. String literal 'me' for member associated with account token.
 */

export type MemberParam = number | 'me';

/**
 * GET /team/members
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamMembers
 */

export interface Search extends Search {
  group_id?: number;
  id?: number | 'me';
  name?: string;
  on_call?: DutyType;
  ref?: string;
  status?: OperationalStatus;
  status_custom_id?: number;
  status_id?: number;
}

export interface Index extends Response<Array<Member>> {}

/**
 * GET /team/members/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamMembersMember
 */

export interface Show extends Response<Member> {}

/**
 * PUT /team/members/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamMembersMember
 */

export interface Change {
  address?: string;
  address_city?: string;
  address_ocuntry?: string;
  address_postcode?: string;
  address_region?: string;
  address_street?: string;
  cost_per_hour?: number;
  cost_per_use?: number;
  date_join?: DateParameter;
  date_leave?: DateParameter;
  email?: string;
  gridref?: string;
  lat?: number;
  lng?: number;
  location_bookmark_id?: number;
  name?: string;
  notes?: string;
  pager?: string;
  pager_email?: string;
  phone_home?: string;
  phone_mobile?: string;
  phone_work?: string;
  position?: string;
  ref?: string;
  retired_reason_id?: number;
  role_id?: number;
  status_label_id?: number;
}

export interface Update extends Response<Member> {}

/**
 * GET /team/members/:id/groups
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamMembersMemberGroups
 */

export interface Groups extends Response<Array<Group>> {}

/**
 * GET /team/members/status-labels
 * =============================================================================
 * Although at the surface a simple array, the response has an exacting tuple
 * format across all regions and organisations. The quadruple has four values in
 * ascending order of type and per the OperationalStatus enum.
 *
 * id and value attributes don't particular matter as organisations will instead
 * use labels.
 *
 * @example
 *
 *  const data: LabelData = [
 *    {
 *      id: 1,
 *      type: 'Operational'
 *      labels: []
 *    },
 *    {
 *      id: 2,
 *      type: 'Non-Operational'
 *      labels: []
 *    },
 *    {
 *      id: 3,
 *      type: 'Retired',
 *      labels: []
 *    },
 *    {
 *      id: 4,
 *      type: 'Deleted',
 *      labels: []
 *    }
 *  ]
 */

export type LabelData = [
  StatusLabel & { type: OperationalStatus.Operational },
  StatusLabel & { type: OperationalStatus.NonOperational },
  StatusLabel & { type: OperationalStatus.Retired },
  StatusLabel & { type: OperationalStatus.Deleted }
];

export interface Labels extends Response<LabelData> {}
