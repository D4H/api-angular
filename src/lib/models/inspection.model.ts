export enum InspectionResult {
  Incomplete = 0,
  Operational = 1,
  ToMonitor = 2,
  RepairRequired = 3,
  // Thierry lost 4 somewhere.
  // See: https://github.com/D4H/decisions-project/issues/3596
  Lost = 5,
  Unserviceable = 6
}

// GET /team/inspections(/:id)
export interface Inspection {
  active: boolean;
  all_kinds: boolean;
  bundle: string;
  date_due: Date;
  description: string;
  gear_parent_id: number;
  id: number;
  interval_unit: number;
  interval_value: number;
  is_auto_unserviceable: boolean;
  items_count: number;
  items_due_count: number;
  location_id: number;
  member_id: number;
  organisation_id: number;
  reminder_unit: number;
  reminder_value: number;
  team_id: number;
  title: string;
}

// GET /team/inspections/:id/items
export interface InspectionItem {
  completed: boolean;
  date_completed: Date;
  date_due: Date;
  description: string;
  equipment_id: number;
  id: number;
  inspection_id: number;
  last_modified: Date;
  member_id: number;
  repair_id: number;
  status: InspectionResult;
  team_id: number;
  title: string;
}

// GET /team/inspections/:id/equipment
export interface InspectionEquipment {
  completed: boolean;
  date_completed: Date;
  date_due: Date;
  description: string;
  equipment_id: number;
  id: number;
  inspection_id: number;
  last_modified: Date;
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
