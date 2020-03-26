import moment from 'moment';
import faker from 'faker';
import { Factory } from '@d4h/testing';
import { TestBed } from '@angular/core/testing';

import { Agenda, CalendarEvent, Range } from '../../lib/models';
import { AgendaBuilder } from '../../lib/builders';
import { clampEventDates, eventDates, eventSortComparator } from '../../lib/tools';

describe('AgendaBuiler', () => {
  let builder: AgendaBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AgendaBuilder
      ]
    });

    builder = TestBed.get<AgendaBuilder>(AgendaBuilder);
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  describe('build', () => {
    let event: CalendarEvent;
    let range: Range;
    let memberId: number;

    beforeEach(() => {
      event = Factory.build('CalendarEvent');
      memberId = faker.random.number();

      range = {
        after: moment().subtract(1, 'week').toISOString(),
        before: moment().add(1, 'week').toISOString()
      };
    });

    it('should be a function', () => {
      expect(typeof builder.build).toBe('function');
    });

    it('should generate an agenda for each date that event falls upon', () => {
      expect(builder.build(memberId, [event], range)).toEqual({
        member_id: memberId,
        dates: eventDates(event),
        events: eventDates(event).filter(clampEventDates(range)).reduce(
          (acc: Agenda, date: number): Agenda => ({
            ...acc,
            [date]: (acc[date] || []).concat(event)
          }),
          {}
        )
      });
    });
  });
});
