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
 * From: /team/inspection-results(/:id)
 *
 * This is the result of an inspection, which holds a list of items to actually
 * inspect. This is logically, e.g. opening a box and ensuring the contents are
 * present.
 */

export interface Result {
  completed: boolean;
  created_at: IsoDate;
  date_completed: IsoDate;
  date_due: IsoDate;
  description: string;
  id: number;
  member_id: number;
  notification_sent: boolean;
  reminder_date: IsoDate;
  reminder_sent: boolean;
  repair_id: number;
  status: ResultStatus;
  team_id: number;
  updated_at: IsoDate;

  equipment: {
    id: number;
    ref: string;
    title: string;
  };

  inspection: {
    id: number;
    title: string;
  };
}
