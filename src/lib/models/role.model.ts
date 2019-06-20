export interface Role {
  bundle?: string;
  id: number;
  organisation_id?: number;
  title: string;
  unit_id: number; // team_id

  cost_per_hour?: {
    currency: string;
    value: number;
  };

  cost_per_use?: {
    currency: string;
    value: number;
  };
}
