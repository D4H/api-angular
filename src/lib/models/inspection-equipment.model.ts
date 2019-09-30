import { IsoDate } from './iso-date.model';
import { ResultStatus } from './result.model';

/**
 * Inspection Equipment
 * =============================================================================
 * From /team/inspections/:id/equipment
 *
 * This appears to be a stubbed record used in some dashboard view. For the time
 * being developer-users can ignore this, because it will be deprecated in
 * favour of a new inspection_id=number parameter on /team/equipment.
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
  status: ResultStatus;
  team_id: number;

  kind: {
    id: number;
    title: string;
  };
}
