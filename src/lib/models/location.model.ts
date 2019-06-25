export interface Location {
  bundle?: string;
  count: number;
  created: Date;
  id: number;
  title: string;
  unit_id: number; // team_id
  unit_title: string; // team_name
  updated?: Date;
}
