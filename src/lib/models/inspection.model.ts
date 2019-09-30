import { InheritedEntity } from './inherited-entity.model';
import { IsoDate } from './iso-date.model';

export enum InspectionInterval {
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR'
}

/**
 * Inspection
 * =============================================================================
 * An Inspection record has these XOR fields:
 *
 *  - organisation_id ^ team_id
 *  - location_id ^ member_id
 */

export type Inspection = {
  active: boolean;
  all_kinds: boolean;
  bundle: string;
  date_due: IsoDate;
  description: string;
  gear_parent_id: number;
  id: number;
  interval_unit: InspectionInterval;
  interval_value: number;
  is_auto_unserviceable: boolean;
  items_count: number;
  items_due_count: number;
  location_id: number;
  member_id: number;
  reminder_unit: InspectionInterval;
  reminder_value: number;
  title: string;
} & InheritedEntity;
