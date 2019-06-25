import { Cost } from './cost.model';

export interface Role {
  bundle?: string;
  cost_per_hour?: Cost;
  cost_per_use?: Cost;
  id: number;
  organisation_id?: number;
  title: string;
  unit_id: number; // team_id
}
