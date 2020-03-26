import * as Moment from 'moment';
import { DateRange, extendMoment } from 'moment-range';
import { Factory } from '@d4h/testing';

import { CalendarEvent, Range } from '../../lib/models';
import { clampEventDates, eventDates, eventSortComparator } from '../../lib/tools';

const moment = extendMoment(Moment);

describe('Calendar Event Tools', () => {
  describe('clampEventDates', () => {
    let date: number;
    let range: Range;

    beforeEach(() => {
      date = new Date(2007, 4, 31).getTime();

      range = {
        after: new Date(2006, 6, 15).toISOString(),
        before: new Date(2009, 8, 15).toISOString()
      };
    });

    it('should be a function', () => {
      expect(typeof clampEventDates).toBe('function');
    });

    it('should be true with default test data', () => {
      expect(clampEventDates(range)(date)).toBe(true);
    });

    it('should be true when given no range', () => {
      expect(clampEventDates(undefined)(date)).toBe(true);
    });

    it('should be false when date is not an integer', () => {
      expect(clampEventDates(range)(undefined)).toBe(false);
    });

    it('should be false when date is not an integer', () => {
      expect(clampEventDates(range)(undefined)).toBe(false);
    });

    it('should be false when date <> range', () => {
      date = new Date(0).getTime();
      expect(clampEventDates(range)(date)).toBe(false);
    });

    it('should be false when date < range.after', () => {
      range.after = new Date(3000, 0, 1).toISOString();
      range.before = undefined;
      date = new Date(0).getTime();
      expect(clampEventDates(range)(date)).toBe(false);
    });

    it('should be true when date > range.after', () => {
      range.after = new Date(0).toISOString();
      range.before = undefined;
      date = new Date(3000, 0, 1).getTime();
      expect(clampEventDates(range)(date)).toBe(true);
    });

    it('should be false when date > range.before', () => {
      range.after = undefined;
      range.before = new Date(0).toISOString();
      date = new Date(3000, 0, 1).getTime();
      expect(clampEventDates(range)(date)).toBe(false);
    });

    it('should be true when date < range.before', () => {
      range.after = undefined;
      range.before = new Date(3000, 0, 1).toISOString();
      date = new Date(0).getTime();
      expect(clampEventDates(range)(date)).toBe(true);
    });
  });

  describe('eventDates', () => {
    let dates: Array<number>;
    let event: CalendarEvent;
    let range: DateRange;

    beforeEach(() => {
      event = Factory.build('CalendarEvent');
    });

    it('should be a function', () => {
      expect(typeof eventDates).toBe('function');
    });

    it('should generate an array of start-of-day timestamps for each date the event falls on', () => {
      range = moment.range(moment(event.start), moment(event.end)).snapTo('day');
      dates = Array.from(range.by('day')).map(date => date.startOf('day').valueOf());
      expect(eventDates(event)).toEqual(dates);
    });
  });

  describe('eventSortComparator', () => {
    let a: CalendarEvent;
    let b: CalendarEvent;

    beforeEach(() => {
      a = Factory.build('CalendarEvent');
      b = Factory.build('CalendarEvent');
    });

    it('should be a function', () => {
      expect(typeof eventSortComparator).toBe('function');
    });

    it('should return -1 when a.start < b.start', () => {
      a.start = new Date(0).toISOString();
      b.start = new Date().toISOString();
      expect(eventSortComparator(a, b)).toBeLessThanOrEqual(-1);
    });

    it('should return 0 when a.start === b.start', () => {
      a.start = new Date(0).toISOString();
      b.start = new Date(0).toISOString();
      expect(eventSortComparator(a, b)).toBe(0);
    });

    it('should return 1 when a.start > b.start', () => {
      a.start = new Date().toISOString();
      b.start = new Date(0).toISOString();
      expect(eventSortComparator(a, b)).toBeGreaterThanOrEqual(1);
    });
  });
});
