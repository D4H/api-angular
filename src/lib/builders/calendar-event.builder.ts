import { Injectable } from '@angular/core';

import { ClientModule } from '../client.module';

import {
  ActivityType,
  Attendance,
  CalendarEvent,
  CalendarEventStatus,
  CalendarEventType,
  Duty
} from '../models';

/**
 * Calendar Event Builder
 * =============================================================================
 * Return a union record from Attendance/Duty, used for calendar and agenda
 * feeds in the Personnel application. Personnel performs further customization
 * in regards colours and item output text.
 *
 *  - Attendance
 *    - Type is derived from the parent activity.
 *    - Not event activity (older teams) has a ref value
 *  - Duty
 *    - Not every duty has an assigned role.
 */

@Injectable({ providedIn: ClientModule })
export class CalendarEventBuilder {
  attendance(attendance: Attendance): CalendarEvent {
    return {
      color: undefined,
      end: attendance.enddate,
      id: this.attendanceId(attendance),
      start: attendance.date,
      text: this.attendanceText(attendance),

      entity: {
        id: attendance.id,
        member_id: attendance.member.id,
        status: attendance.status,
        type: this.activityType(attendance.activity.type)
      }
    };
  }

  duty(duty: Duty): CalendarEvent {
    return {
      color: undefined,
      end: duty.enddate,
      id: this.dutyId(duty),
      start: duty.date,
      text: this.dutyText(duty),

      entity: {
        id: duty.id,
        member_id: duty.member_id,
        status: duty.type,
        type: CalendarEventType.Duty
      }
    };
  }

  // Also used externally to get ID during change events.
  attendanceId({
    activity = { type: undefined },
    id
  }: { id: number, activity: { type: ActivityType } }): string {
    return `${this.activityType(activity.type)}-${id}`;
  }

  // Also used externally to get ID during change events.
  dutyId({ id }: { id: number }): string {
    return `${CalendarEventType.Duty}-${id}`;
  }

  // CalendarEventType effectively extends ActivityType.
  private activityType(type: ActivityType): CalendarEventType {
    switch (type) {
      case ActivityType.Event:
        return CalendarEventType.Event;
      case ActivityType.Exercise:
        return CalendarEventType.Exercise;
      case ActivityType.Incident:
        return CalendarEventType.Incident;
      default:
        return CalendarEventType.Activity;
    }
  }

  // Some teams have older activities without refs.
  private attendanceText(attendance: Attendance): string {
    if (attendance.activity.ref) {
      return `#${attendance.activity.ref} ${attendance.activity.title}`;
    } else {
      return attendance.activity.title;
    }
  }

  // Not every duty has an assigned role.
  private dutyText(duty: Duty): string {
    if (duty.role) {
      return duty.role.title;
    } else {
      return undefined;
    }
  }
}
