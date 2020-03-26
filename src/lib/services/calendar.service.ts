import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Agenda, CalendarEvent, Range } from '../models';
import { AgendaBuilder, CalendarEventBuilder } from '../builders';
import { AttendanceService } from './attendance.service';
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
    private readonly agendaBuilder: AgendaBuilder,
    private readonly attendanceService: AttendanceService,
    private readonly eventBuilder: CalendarEventBuilder,
    private readonly dutyService: DutyService
  ) {}

  agenda(memberId: number, range?: Range): Observable<Agenda> {
    return this.index({ ...range, member: memberId }).pipe(
      map(events => this.agendaBuilder.build(memberId, events, range))
    );
  }

  index(search: CalendarEvents.Query = {}): Observable<Array<CalendarEvent>> {
    return forkJoin([
      this.attendanceService.index(search).pipe(
        map(({ data }) => data.map(item => this.eventBuilder.attendance(item)))
      ),
      this.dutyService.index(search).pipe(
        map(({ data }) => data.map(item => this.eventBuilder.duty(item)))
      )
    ]).pipe(
      map((data: Array<Array<CalendarEvent>>) => data.flat())
    );
  }
}
