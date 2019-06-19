import { IsoDate } from './general.model';
import { Period } from './period.model';
import { Role } from './role.model';

export enum DutyType {
  Off = 'off',
  On = 'on'
}

export enum DutyRepeatInterval {
  Day = 'day',
  Month = 'month',
  Year = 'year',
  Never = 'never'
}

export interface Duty extends Period {
  id: number;
  member_id: number;
  notes: string;
  parent_id?: number;
  repeat_every?: DutyRepeatInterval;
  repeat_until?: IsoDate;
  team_id: number;
  type: DutyType;

  role?: {
    id: number;
    title: string;
  };
}
