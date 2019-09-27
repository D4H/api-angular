import { Currency } from './units.model';
import { EquipmentStatus, EquipmentType } from './equipment.model';
import { InheritedEntity } from './inherited-entity.model';
import { IsoDate } from './iso-date.model';
import { MembershipType } from './membership.model';

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

export interface Repair {
  date_completed: IsoDate;
  date_created: IsoDate;
  date_due: IsoDate;
  description: string;
  equipment_id: number;
  equipment_ref: string;
  equipment_status: EquipmentStatus;
  equipment_title: string;
  fund_id: number;
  id: number;
  repair_activity_id?: number;
  team_id: number;
  title: string;

  added_by: {
    id: number;
    name: string;
    type: MembershipType;
  };

  assigned_to?: {
    id: number;
    name: string;
    type: MembershipType;
  };

  entity: {
    id: number;
    team_id: number;
    type: EquipmentType;
  };

  repair: {
    activity_id?: number;
    cause: string;
    cost: number;
  };

  repair_cause: {
    id: RepairCause;
    label: string;
  };

  repair_cost: {
    symbol: Currency;
    value: number;
  };

  status: {
    id: RepairStatus;
    label: string;
  };
}
