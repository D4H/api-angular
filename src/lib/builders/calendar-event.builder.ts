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
      event_id: attendance.id,
      event_status: attendance.status,
      event_type: this.activityType(attendance),
      id: `${this.activityType(attendance)}-${attendance.id}`,
      member_id: attendance.member.id,
      start: attendance.date,
      text: this.attendanceText(attendance)
    };
  }

  duty(duty: Duty): CalendarEvent {
    return {
      color: undefined,
      end: duty.enddate,
      event_id: duty.id,
      event_status: duty.type,
      event_type: CalendarEventType.Duty,
      id: `${CalendarEventType.Duty}-${duty.id}`,
      member_id: duty.member_id,
      start: duty.date,
      text: this.dutyText(duty)
    };
  }

  private activityType(attendance: Attendance): CalendarEventType {
    switch (attendance.activity.type) {
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
