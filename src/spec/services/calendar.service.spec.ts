import { Factory } from '@d4h/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';

import { Attendance, CalendarEvent, Duty } from '../../lib/models';
import { CalendarEventBuilder } from '../../lib/builders';
import { ClientTestModule } from '../client-test.module';

import {
  AttendanceService,
  CalendarService,
  DutyService
} from '../../lib/services';

describe('CalendarService', () => {
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
});
