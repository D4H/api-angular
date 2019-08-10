import { IsoDate } from './iso-date.model';
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
  role?: Pick<Role, 'id' | 'title'>;
  team_id: number;
  type: DutyType;
}
