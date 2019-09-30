import { IsoDate } from './iso-date.model';
import { InspectionResult } from './inspection-item.model';

/**
 * Inspection Equipment
 * =============================================================================
 * Returned from /team/inspections/:id/equipment(:/id). Waiting on @tdtm for
 * information on any uses.
 */

export interface InspectionEquipment {
  completed: boolean;
  date_completed: IsoDate;
  date_due: IsoDate;
  description: string;
  equipment_id: number;
  id: number;
  inspection_id: number;
  last_modified: IsoDate;
  location: Array<string>;
  member_id: number;
  ref: string;
  repair_id: number;
  status: InspectionResult;
  team_id: number;

  kind: {
    id: number;
    title: string;
  };
}
