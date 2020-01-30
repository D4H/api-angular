import faker from 'faker';
import { Factory, sample } from '@d4h/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ClientTestModule } from '../client-test.module';
import { CalendarEventBuilder } from '../../lib/builders';
import { Attendance, CalendarEvent, Duty } from '../../lib/models';

import {
  AttendanceService,
  CalendarService,
  DutyService
} from '../../lib/services';

describe('CalendarService', () => {
  let attendanceService;
  let builder: CalendarEventBuilder;
  let dutyService;
  let result$: Observable<any>;
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
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

    attendanceService = TestBed.get(AttendanceService);
    builder = TestBed.get(CalendarEventBuilder);
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
        ...attendances.map(attendance => builder.attendance(attendance)),
        ...duties.map(duty => builder.duty(duty))
      ];
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call attendanceService, dutyService and return calendar events', () => {
      attendanceService.index.and.returnValue(of(attendances));
      dutyService.index.and.returnValue(of(duties));
      result$ = hot('(a|)', { a: events });

      expect(service.index()).toBeObservable(result$);
      expect(attendanceService.index).toHaveBeenCalledWith({});
      expect(dutyService.index).toHaveBeenCalledWith({});
    });
  });
});
