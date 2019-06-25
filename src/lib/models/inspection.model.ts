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
