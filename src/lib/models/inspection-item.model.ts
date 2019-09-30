import { IsoDate } from './iso-date.model';

/**
 * Inspection Result
 * =============================================================================
 * The numeric status of an inspection of an item of equipment.
 */

export enum InspectionResult {
  Incomplete,
  Operational,
  ToMonitor,
  RepairRequired,
  Retired,
  Lost,
  Unserviceable
}

/**
 * Inspection Item
 * =============================================================================
 * Returned from /team/inspections/:id/items(:id).
 */

export interface InspectionItem {
  completed: boolean;
  date_completed: IsoDate;
  date_due: IsoDate;
  description: string;
  equipment_id: number;
  id: number;
  inspection_id: number;
  last_modified: IsoDate;
  member_id: number;
  repair_id: number;
  status: InspectionResult;
  team_id: number;
  title: string;
}
