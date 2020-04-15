import { CustomField } from './custom-field.model';
import { DutyType } from './duty.model';
import { IsoDate } from './iso-date.model';
import { NumericBoolean } from './general.model';
import { OperationalStatus } from './status.model';

/**
 * Member Duty Status
 * ============================================================================
 * There are two sets of fields-one old, one new-on the Member record with which
 * current duty status can be determined.
 *
 * Old Fields: These are deprecated because their values are *only* set when a
 * Duty record exists at the moment in time you fetch the record. If no record
 * exists at the time of GET, then they are unset.
 *
 * The old fields also contain no role information leads to a situation where
 * the client has to make a number of extra GET requests in order to determine
 * the totality of the member's current duty status.
 *
 * New Fields: These indicate the totality of the *current duty status* of the
 * member, regardless of whether a Duty record exists. Are they on- or off-duty?
 * As what role? When will it change?
 *
 * @example
 *
 *  // Old/Deprecated
 *  duty_end?: IsoDate;     // Duty enddate.
 *  duty_id?: number;       // Duty id.
 *  duty_role_id?: number;  // Duty role_id.
 *  duty_start?: IsoDate;   // Duty date.
 *  duty_type?: number;     // Duty DutyType cast as boolean.
 *
 *  // New/Majestic
 *  duty_status {
 *    date: IsoDate;        // Date when Duty status last changed.
 *    duty_id?: number;     // Duty record ID if one exists now.
 *    enddate: IsoDate;     // Date when Duty status will next change.
 *    role_id?: number;     // Current role ID, if set.
 *    role_title?: string;  // Current role title if set.
 *    status: DutyType;     // Current DutyType, on or off.
 *  }
 */

interface MemberDutyStatus {
  date: IsoDate;
  duty_id?: number;
  enddate: IsoDate;
  role_id?: number;
  role_title?: string;
  status: DutyType;
}

/**
 * Member Permission
 * =============================================================================
 * Permission fields are restricted and only returned when:
 *
 *  1. GET /team/members/me
 *  2. GET /team/members/member_id_associated_with_token
 *  3. GET /team/members/:id with token belonging to >= PermissionType.Editor
 */

export enum Permission {
  None = 'none',
  Member = 'member',
  MemberPlus = 'memberplus',
  Editor = 'editor',
  Owner = 'owner'
}

export interface MemberPermissions {
  documents: boolean;
  events: boolean;
  exercises: boolean;
  gear: boolean;
  gear_basic: boolean;
  healthsafety: boolean;
  id: number;
  incidents: boolean;
  name: Permission;
  sms: boolean;
}

/**
 * Member
 * ============================================================================
 * Fields marked "Restricted" are only returned three conditions:
 *
 *  1. GET /team/members/me
 *  2. GET /team/members/member_id_associated_with_token
 *  3. GET /team/members/:id with token belonging to >= PermissionType.Editor
 *
 * It is not possible for the client to infer returned values from the input
 * token, as it does not contain any extractable role or identity information.
 */

export interface EmergencyContact {
  alt_phone: string;
  name: string;
  phone: string;
  relation: string;
}

export interface Member {
  address?: string; // Restricted.
  custom_fields?: Array<CustomField>;
  default_duty: DutyType;
  default_role_id?: number;
  duty_status?: MemberDutyStatus;
  email: string;
  emergency_contacts?: Array<EmergencyContact>; // Restricted.
  group_ids: Array<number>;
  homephone?: string; // Restricted.
  id: number;
  mobilephone: string;
  name: string;
  notes?: string;
  on_call: boolean;
  pager: string;
  pager_email: string;
  permission?: MemberPermissions; // Restricted.
  position: string;
  ref: string;
  team_id: number;
  urls: object;
  workphone?: string; // Restricted.

  // These will be set /if/ a Duty exists for Member when you GET Member.
  // These fields are deprecated in favour of { duty_status: MemberDutyStatus }.
  duty_end?: IsoDate;
  duty_id?: number;
  duty_role_id?: number;
  duty_start?: IsoDate;
  duty_type?: NumericBoolean;

  status: {
    id: number;
    type: OperationalStatus;
    value: string;

    label?: {
      id: number;
      value: string;
    };
  };
}
