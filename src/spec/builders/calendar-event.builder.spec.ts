import faker from 'faker';
import { Factory } from '@d4h/testing';
import { TestBed } from '@angular/core/testing';

import {
  ActivityType,
  Attendance,
  CalendarEvent,
  CalendarEventStatus,
  CalendarEventType,
  Duty
} from '../../lib/models';

import { CalendarEventBuilder } from '../../lib/builders';

describe('CalendarEventBuilder', () => {
  let builder: CalendarEventBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarEventBuilder
      ]
    });

    builder = TestBed.get<CalendarEventBuilder>(CalendarEventBuilder);
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  describe('attendance', () => {
    let attendance: Attendance;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
    });

    it('should be a function', () => {
      expect(typeof builder.attendance).toBe('function');
    });

    it('should convert Attendance to CalendarEvent', () => {
      const type = (attendance.activity.type as any) as CalendarEventType;

      const text = attendance.activity.ref
        ? `#${attendance.activity.ref} ${attendance.activity.title}`
        : attendance.activity.title;

      expect(builder.attendance(attendance)).toEqual({
        color: null,
        end: attendance.enddate,
        event_id: attendance.id,
        event_status: attendance.status,
        event_type: type,
        id: `${type}-${attendance.id}`,
        member_id: attendance.member.id,
        start: attendance.date,
        text
      });
    });

    it('should have event_type Event', () => {
      attendance.activity.type = ActivityType.Event;

      expect(builder.attendance(attendance).event_type)
        .toBe(CalendarEventType.Event);
    });

    it('should have event_type Exercise', () => {
      attendance.activity.type = ActivityType.Exercise;

      expect(builder.attendance(attendance).event_type)
        .toBe(CalendarEventType.Exercise);
    });

    it('should have event_type Incident', () => {
      attendance.activity.type = ActivityType.Incident;

      expect(builder.attendance(attendance).event_type)
        .toBe(CalendarEventType.Incident);
    });

    it('should have event_type Activity', () => {
      attendance.activity.type = null;

      expect(builder.attendance(attendance).event_type)
        .toBe(CalendarEventType.Activity);
    });

    it('should have title with reference', () => {
      attendance.activity.ref = faker.random.uuid();
      expect(builder.attendance(attendance).text)
        .toBe(`#${attendance.activity.ref} ${attendance.activity.title}`);
    });

    it('should have title without reference', () => {
      attendance.activity.ref = null;

      expect(builder.attendance(attendance).text)
        .toBe(attendance.activity.title);
    });
  });

  describe('duty', () => {
    let duty: Duty;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
    });

    it('should be a function', () => {
      expect(typeof builder.duty).toBe('function');
    });

    it('should convert Duty to CalendarEvent', () => {
      expect(builder.duty(duty)).toEqual({
        color: null,
        end: duty.enddate,
        event_id: duty.id,
        event_status: duty.type,
        event_type: CalendarEventType.Duty,
        id: `${CalendarEventType.Duty}-${duty.id}`,
        member_id: duty.member_id,
        start: duty.date,
        text: duty.role.title
      });
    });

    it('should have text duty.role.title', () => {
      duty.role = { id: null, title: faker.random.uuid() };
      expect(builder.duty(duty).text).toBe(duty.role.title);
    });

    it('should have text null', () => {
      duty.role = null;
      expect(builder.duty(duty).text).toBe(null);
    });
  });
});
