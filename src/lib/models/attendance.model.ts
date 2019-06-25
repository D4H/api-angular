import { ActivityType } from './activity.model';
import { Member } from './member.model';
import { Period } from './period.model';

export enum AttendanceStatus {
  Absent = 'absent',
  Attending = 'attending',
  Requested = 'requested'
}

export interface Attendance extends Period {
  duration: number;
  id: number;
  member: Pick<Member, 'id' | 'name'>;
  role: number;
  status: AttendanceStatus;

  activity: {
    date: Date;
    enddate: Date;
    id: number;
    ref: string;
    title: string;
    type: ActivityType;
  };
}
