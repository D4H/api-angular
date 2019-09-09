import { InheritedEntity } from './inherited-entity.model';
import { IsoDate } from './iso-date.model';

enum RepairInterval {
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR'
}

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
  location_id: number;
  member_id: number;
  remainder_unit: RepairInterval;
  remainder_value: number;
  title: string;
} & InheritedEntity;
