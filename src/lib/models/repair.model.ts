import { EquipmentStatus, EquipmentType } from './equipment.model';
import { IsoDate } from './iso-date.model';
import { MembershipType } from './membership.model';
import { SymbolCost } from './cost.model';

export enum RepairCause {
  Unknown = 0,
  Deterioration = 1,
  Use = 2,
  Misuse = 3,
  Maintenance = 4
}

export enum RepairStatus {
  NotStarted = 0,
  Completed = 1,
  InProgress = 8
}

export interface Repair {
  date_completed?: IsoDate;
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
  repair_cost: SymbolCost;
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
    location_id: number;
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

  status: {
    id: RepairStatus;
    label: string;
  };
}
