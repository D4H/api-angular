import { IsoDate } from './iso-date.model';

export interface Location {
  bundle?: string;
  count: number;
  created: IsoDate;
  id: number;
  title: string;
  unit_id: number; // team_id
  unit_title: string; // team_name
  updated?: IsoDate;
}
