import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { Attendance } from '../models';
import { Attendances, Index } from '../api';
import { ClientModule } from '../client.module';

@Injectable({ providedIn: ClientModule })
export class AttendanceService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Attendances.Search = {}): Observable<Index<Attendance>> {
    const route: string = this.routes.team.attendances.index;
    const payload: any = { params: query };

    return this.http.get<Attendances.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Attendance> {
    const route: string = this.routes.team.attendances.show(id);

    return this.http.get<Attendances.Show>(route).pipe(
      pluck('data')
    );
  }

  create(body: Attendances.New): Observable<Attendance> {
    const route: string = this.routes.team.attendances.index;

    return this.http.post<Attendances.Create>(route, body).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Attendances.Change): Observable<Attendance> {
    const route: string = this.routes.team.attendances.update(id);

    return this.http.put<Attendances.Show>(route, body).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.attendances.destroy(id);

    return this.http.delete<Attendances.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
