import { IsoDate } from './iso-date.model';

import { AttendanceStatus } from './attendance.model';
import { DutyType } from './duty.model';

export enum CalendarEventType {
  Activity = 'activity',
  Duty = 'duty',
  Event = 'event',
  Exercise = 'exercise',
  Incident = 'incident'
}

export type CalendarEventStatus = AttendanceStatus | DutyType;

/**
 * D4H/Mobiscroll Event Object
 * =============================================================================
 * This class model combines attributes from:
 *
 *  1. D4H: Referenced event ID, member, status and type.
 *  2. Mobiscroll: color, end, start, and text.
 *
 * All attributes marked as private or optional are either assigned
 * programmatically, or used intenrally by Mobiscroll.
 *
 * @see https://docs.mobiscroll.com/angular/eventcalendar#opt-data
 * @see https://forum.mobiscroll.com/t/immutable-calendar-objects/265
 * @see https://github.com/D4H/decisions-project/issues/2606
 * @see https://github.com/D4H/decisions-project/issues/2950
 */

export interface CalendarEvent {
  color: string;
  end: IsoDate;
  event_id: number;
  event_status: CalendarEventStatus;
  event_type: CalendarEventType;
  id: string;
  member_id: number;
  start: IsoDate;
  text: string;
}
