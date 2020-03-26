import faker from 'faker';
import { Factory, sample } from '@d4h/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { Agenda, Attendance, CalendarEvent, Duty } from '../../lib/models';
import { AgendaBuilder, CalendarEventBuilder } from '../../lib/builders';
import { ClientTestModule } from '../client-test.module';

import {
  AttendanceService,
  CalendarService,
  DutyService
} from '../../lib/services';

describe('CalendarService', () => {
  let agendaBuilder: AgendaBuilder;
  let attendanceService;
  let dutyService;
  let eventBuilder: CalendarEventBuilder;
  let result$: Observable<any>;
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        AgendaBuilder,
        CalendarEventBuilder,
        CalendarService,
        {
          provide: AttendanceService,
          useValue: jasmine.createSpyObj('attendanceService', ['index'])
        },
        {
          provide: DutyService,
          useValue: jasmine.createSpyObj('dutyService', ['index'])
        }
      ]
    });

    agendaBuilder = TestBed.get(AgendaBuilder);
    attendanceService = TestBed.get(AttendanceService);
    eventBuilder = TestBed.get(CalendarEventBuilder);
    dutyService = TestBed.get(DutyService);
    service = TestBed.get(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    let attendances: Array<Attendance>;
    let duties: Array<Duty>;
    let events: Array<CalendarEvent>;

    beforeEach(() => {
      attendances = Factory.buildList('Attendance');
      duties = Factory.buildList('Duty');

      events = [
        ...attendances.map(attendance => eventBuilder.attendance(attendance)),
        ...duties.map(duty => eventBuilder.duty(duty))
      ];
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call attendanceService, dutyService and return calendar events', () => {
      attendanceService.index.and.returnValue(of({ data: attendances }));
      dutyService.index.and.returnValue(of({ data: duties }));
      result$ = hot('(a|)', { a: events });

      expect(service.index()).toBeObservable(result$);
      expect(attendanceService.index).toHaveBeenCalledWith({});
      expect(dutyService.index).toHaveBeenCalledWith({});
    });
  });

  describe('agenda', () => {
    let agenda: Agenda;
    let attendances: Array<Attendance>;
    let duties: Array<Duty>;
    let events: Array<CalendarEvent>;
    let memberId: number;

    beforeEach(() => {
      attendances = Factory.buildList('Attendance');
      duties = Factory.buildList('Duty');
      memberId = faker.random.number();

      events = [
        ...attendances.map(attendance => eventBuilder.attendance(attendance)),
        ...duties.map(duty => eventBuilder.duty(duty))
      ];

      agenda = agendaBuilder.build(memberId, events);
    });

    it('should be a function', () => {
      expect(typeof service.agenda).toBe('function');
    });

    it('should call attendanceService, dutyService and return calendar events', () => {
      attendanceService.index.and.returnValue(of({ data: attendances }));
      dutyService.index.and.returnValue(of({ data: duties }));
      result$ = hot('(a|)', { a: agenda });

      expect(service.agenda(memberId)).toBeObservable(result$);
      expect(attendanceService.index).toHaveBeenCalledWith({ member: memberId });
      expect(dutyService.index).toHaveBeenCalledWith({ member: memberId });
    });
  });
});
