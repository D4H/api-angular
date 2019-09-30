import { Currency } from './units.model';
import { EquipmentStatus, EquipmentType } from './equipment.model';
import { IsoDate } from './iso-date.model';
import { MembershipType } from './membership.model';

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
