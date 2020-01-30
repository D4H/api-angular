import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attendance, CalendarEvent, Duty } from '../models';
import { AttendanceService } from './attendance.service';
import { CalendarEventBuilder } from '../builders';
import { CalendarEvents } from '../api';
import { ClientModule } from '../client.module';
import { DutyService } from './duty.service';

/**
 * Calendar Event Service
 * =============================================================================
 * A CalendarEvent is a union of
 *
 *  - Attendance: Upcoming attendance periods.
 *  - Duty: Upcoming duty periods.
 */

@Injectable({ providedIn: ClientModule })
export class CalendarService {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly builder: CalendarEventBuilder,
    private readonly dutyService: DutyService
  ) {}

  index(search: CalendarEvents.Search = {}): Observable<Array<CalendarEvent>> {
    return forkJoin([
      this.attendanceService.index(search).pipe(
        map(attendances => attendances.map(atn => this.builder.attendance(atn)))
      ),
      this.dutyService.index(search).pipe(
        map(duties => duties.map(duty => this.builder.duty(duty)))
      )
    ]).pipe(
      map((data: Array<Array<CalendarEvent>>) => data.flat())
    );
  }
}
