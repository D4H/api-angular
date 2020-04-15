import { ActivityType } from './activity.model';
import { IsoDate } from './iso-date.model';
import { Member } from './member.model';

export enum AttendanceStatus {
  Absent = 'absent',
  Attending = 'attending',
  Requested = 'requested'
}

export interface Attendance {
  date: IsoDate;
  duration: number;
  enddate: IsoDate;
  id: number;
  member: Pick<Member, 'id' | 'name'>;
  role: number;
  status: AttendanceStatus;

  activity: {
    date: IsoDate;
    enddate: IsoDate;
    id: number;
    ref: string;
    title: string;
    type: ActivityType;
  };
}
