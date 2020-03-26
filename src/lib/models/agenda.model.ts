import { CalendarEvent } from './calendar-event.model';

/**
 * Calendar Event Agenda
 * =============================================================================
 */

export interface Agenda {
  dates: Array<number>;
  member_id: number;

  events: {
    [key: number]: Array<CalendarEvent>;
  };
}
