import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { AttendanceService } from './attendance.service';
import { CalendarEvent, Range } from '../models';
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
    private readonly eventBuilder: CalendarEventBuilder,
    private readonly dutyService: DutyService
  ) {}

  index(query: CalendarEvents.Query = {}): Observable<Array<CalendarEvent>> {
    return forkJoin([
      this.attendanceService.index(query).pipe(
        map(({ data }) => data.map(item => this.eventBuilder.attendance(item)))
      ),
      this.dutyService.index(query).pipe(
        map(({ data }) => data.map(item => this.eventBuilder.duty(item)))
      )
    ]).pipe(
      map((data: Array<Array<CalendarEvent>>) => data.flat())
    );
  }
}
