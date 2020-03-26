import * as Moment from 'moment';
import { DateRange, extendMoment } from 'moment-range';

import { Agenda, CalendarEvent, IsoDate, Range } from '../models';

const moment = extendMoment(Moment);

/**
 * Sort Calendar Events
 * =============================================================================
 * Calendar events are sorted by start date in ascending order: oldest events
 * first.
 */

export function eventSortComparator(a: CalendarEvent, b: CalendarEvent): number {
  return moment(a.start).diff(b.start);
}

/**
 * Event Dates Start-of-Day Timestamps
 * =============================================================================
 * An event has a start date and an end date after that. This contains a range
 * of dates. Take this event:
 *
 * @example
 *
 *  {
 *    start: '2020-02-06T00:15:22.000Z',
 *    start: '2020-02-09T00:18:00.000Z'
 *  }
 *
 * The event falls inclusively on four different calendar dates. eventDates
 * transforms the event into an array of the timestamps for the beginning of
 * each calendar day the event falls upon.
 *
 * @example
 *
 *  [
 *    1580947200 // '2020-02-06T00:00:00.000Z'
 *    1581033600 // '2020-02-07T00:00:00.000Z'
 *    1581120000 // '2020-02-08T00:00:00.000Z'
 *    1581206400 // '2020-02-09T00:00:00.000Z'
 *  ]
 */

export function eventDates(event: CalendarEvent): Array<number> {
  const range: DateRange = moment.range(moment(event.start), moment(event.end));
  const dates: Array<Moment.Moment> = Array.from(range.snapTo('day').by('days'));

  return dates.map(date => date.startOf('day').valueOf());
}

/**
 * Filter: Clamp Event Start-of-Day Timestamps
 * =============================================================================
 * In pratice, the list of calendar events for an agenda are clamped to a given
 * start date and end date.
 *
 * For example, while a team member may have calendar events going backwards for
 * a year or more, they may only wish to see those events this are happening
 * either at this moment in time, or thereafter.
 */

export function clampEventDates(range: Partial<Range> = {}): (date: number) => boolean {
  return (date: number): boolean => {
    if (!Number.isInteger(date)) {
       return false;
    }

    if (range.after && range.before) {
      return moment.range(moment(range.after), moment(range.before)).contains(moment(date));
    }

    if (range.after) {
      return moment(date).isSameOrAfter(range.after);
    }

    if (range.before) {
      return moment(date).isSameOrBefore(range.before);
    }

    return true;
  };
}
