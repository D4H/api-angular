import { Cost } from './cost.model';
import { CustomField } from './custom-field.model';
import { IsoDate } from './iso-date.model';
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
  barcode: string;
  cost_per_distance?: Cost;
  cost_per_hour?: Cost;
  cost_per_use?: Cost;
  critical_alert: boolean;
  custom_fields?: Array<CustomField>;
  date_expires: IsoDate;
  date_firstuse: IsoDate;
  date_last_moved: IsoDate;
  date_last_status_change: IsoDate;
  date_manufactured: IsoDate;
  date_purchased: IsoDate;
  date_retired: IsoDate;
  date_warranty: IsoDate;
  expire_alert: boolean;
  id: number;
  id_marks: string;
  is_all_child_op: boolean;
  is_critical: boolean;
  is_monitor: boolean;
  minutes_use: number;
  notes: string;
  odometer_reading: number;
  odometer_reading_date: IsoDate;
  odometer_reading_total: number;
  odometer_reading_total_allowed: number;
  quantity: number;
  ref: string;
  replacement_cost: Cost;
  serial: string;
  team_id: number;
  title: string;
  total_replacement_cost?: Cost;
  type: EquipmentType;
  urls?: object;

  brand: {
    id: number;
    title: string;
  };

  category: {
    id: number;
    title: string;
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
    member_name?: string;
    parent_id: number;
    unit_title: string;

    parent_item?: {
      id: number;
      kind: string;
      ref: string;
    };
  };

  model: {
    id: number;
    title: string;
  };

  retired_reason: {
    id: number;
    title: string;
  };

  status: {
    id: number;
    is_all_child_op?: boolean;
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

  total_weight: {
    value: number;
    units: Weight;
  };

  weight: {
    value: number;
    units: Weight;
  };
}
