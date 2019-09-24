import { InheritedEntity } from './inherited-entity.model';
import { IsoDate } from './iso-date.model';

export enum RepairInterval {
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR'
}

/**
 * Repair Location
 * =============================================================================
 * Just an item of equipment can be assigned to a team member, so too can the
 * location of a repair be a person. Clarification comes per @tdtm.
 *
 * Literal    Type      Explanation
 * -----------------------------------------------------------------------------
 * null       Null      Default/omitted status. Same as passing 'all'.
 * number     Number    The ID of a Location record. Number >= 1.
 * none       String    Item which has no location assigned.
 * inbox      String    Item inbound from another team into the current team.
 * outbox     String    Item outbound towards from the curent team to another.
 * personal   String    Item assigned to people (but no person in particular).
 */

export enum LocationType {
  All = 'all',
  Inbox = 'inbox',
  None = 'none',
  Outbox = 'outbox',
  Personal = 'personal'
}

export type RepairLocation
  = null
  | number
  | LocationType;

/**
 * Repair Cause
 * =============================================================================
 */

export enum RepairCause {
  Unknown = 0,
  Deterioration = 1,
  Use = 2,
  Misuse = 3,
  Maintenance = 4
}

/**
 * Repair Status
 * =============================================================================
 */

export enum RepairStatus {
  Completed = 0,
  InProgress = 1,
  NotStarted = 8
}

/**
 * Repair
 * =============================================================================
 * These inherit from either a team or an organisation.
 */

export type Repair = {
  active: boolean;
  all_kinds: boolean;
  bundle: string;
  date_due: IsoDate;
  description: string;
  gear_parent_id: number;
  id: number;
  interval_unit: RepairInterval;
  interval_value: number;
  is_auto_unserviceable: boolean;
  items_count: number;
  items_due_count: number;

  // FIXME: These XOR, one will be present when the other is not.
  location_id: RepairLocation;
  member_id: number;

  remainder_unit: RepairInterval;
  remainder_value: number;
  title: string;
} & InheritedEntity;
