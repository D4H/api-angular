import { Injectable } from '@angular/core';

import { Agenda, CalendarEvent, Range } from '../models';
import { ClientModule } from '../client.module';
import { clampEventDates, eventDates, eventSortComparator } from '../tools';

/**
 * Build Calendar Event Agenda
 * =============================================================================
 *  1. Clone and sort events in ascending order (eventDates).
 *  2. For each event, etermine each date the event falls on (eventDates).
 *  3. For each date (addAgendaEvent)
 *    a. Add that date to agenda.dates.
 *    b. Add that date as a key in agenda.events.
 *    c. Add that event to the array of agenda.events[date]
 *
 * In this way the list of events is segmented on a per-day basis.
 */

@Injectable({ providedIn: ClientModule })
export class AgendaBuilder {
  build(memberId: number, events: Array<CalendarEvent>, range?: Range): Agenda {
    return [...events].sort(eventSortComparator).reduce(
      (acc: Agenda, event: CalendarEvent): Agenda => {
        return eventDates(event)
          .filter(clampEventDates(range))
          .reduce(this.addAgendaEvent(event), acc);
      },
      { dates: [], events: {}, member_id: memberId }
    );
  }

  /**
   * Inert Event into Agenda at Many Dates
   * ===========================================================================
   * For the given event, insert it into the agenda at each further given date.
   * Used in AgendaBuiler
   *
   *  - Date is added if not already present.
   *  - Overall list of dates is converted to a set to avoid duplicates.
   */

  private addAgendaEvent(event: CalendarEvent): (agenda: Agenda, date: number) => Agenda {
    return (agenda: Agenda, date: number): Agenda => {
      return {
        ...agenda,
        dates: [...new Set(agenda.dates.concat(date))],
        events: {
          ...agenda.events,
          [date]: (agenda[date] || []).concat(event)
        }
      };
    };
  }
}
