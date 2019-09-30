import { IsoDate } from './iso-date.model';

/**
 * Inspection Result
 * =============================================================================
 * The numeric status of an inspection of an item of equipment.
 */

export enum ResultStatus {
  Incomplete,
  Operational,
  ToMonitor,
  RepairRequired,
  Retired,
  Lost,
  Unserviceable
}

/**
 * Inspection Result
 * =============================================================================
 * From: /team/inspections/:id/items(/:id)
 *
 * This is the result of an inspection, which holds a list of items to actually
 * inspect. This is logically, e.g. opening a box and ensuring the contents are
 * present.
 *
 * XOR attributes:
 *
 *  - location_id ^ member_id
 */

export interface Result {
  completed: boolean;
  date_completed: IsoDate;
  date_due: IsoDate;
  description: string;
  equipment_id: number;
  id: number;
  inspection_id: number;
  last_modified: IsoDate;
  location_id?: number;
  member_id?: number;
  repair_id: number;
  status: ResultStatus;
  team_id: number;
  title: string;
}
