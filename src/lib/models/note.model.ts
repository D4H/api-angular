import { Period } from './period.model';

export interface Note extends Period {
  from_member_id: number;
  from_member_name: string;
  id: number;
  message: string;
  team_id: number;
  urgent: boolean;
}
