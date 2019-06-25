import { Category } from './category.model';
import { Cost } from './cost.model';
import { Weight } from './units.model';

export enum EquipmentStatus {
  Inactive = 'Inactive',
  Lost = 'Lost',
  Operational = 'Operational',
  Retired = 'Retired',
  Unserviceable = 'Unserviceable',
  Wishlist = 'Wishlist'
}

export enum EquipmentType {
  Equipment = 'equipment',
  Supply = 'supply',
  Vehicle = 'vehicle'
}

export interface Equipment {
  barcode?: string;
  category: Pick<Category, 'id' | 'title'>;
  cost_per_distance?: Cost;
  cost_per_hour?: Cost;
  cost_per_use?: Cost;
  custom_fields?: Array<any>;
  date_expires: Date;
  date_firstuse: Date;
  date_last_moved: Date;
  date_last_status_change: Date;
  date_manufactured: Date;
  date_purchased: Date;
  date_retired: Date;
  date_warranty: Date;
  id: number;
  is_all_child_op: boolean;
  is_critical: boolean;
  is_monitor: boolean;
  minutes_use: number;
  notes: string;
  odometer_reading: number;
  odometer_reading_date: Date;
  odometer_reading_total: number;
  odometer_reading_total_allowed: number;
  quantity: number;
  ref: string;
  serial: string;
  team_id: number;
  title: string;
  total_replacement_cost: Cost;
  total_weight: Weight;
  type: EquipmentType;
  urls?: object;

  brand: {
    id: number;
    title: number;
  };

  kind: {
    id: number;
    title: string;
  };

  location: {
    location_array: Array<string>;
    location_id: number;
    location_title: string;
    member_id: number;
    member_name?: number;
    parent_id: number;
    unit_title: string;
  };

  model: {
    id: number;
    title: string;
  };

  status: {
    id: number;
    title: EquipmentStatus;
  };

  supplier: {
    id: number;
    title: string;
  };

  supplier_ref: {
    id: number;
    title: string;
  };
}
