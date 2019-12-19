import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { Attendance } from '../models';
import { Attendances } from '../api';
import { ClientModule } from '../client.module';

@Injectable({ providedIn: ClientModule })
export class AttendanceService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query?: Attendances.Search): Observable<Array<Attendance>> {
    const route: string = this.routes.team.attendances.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Attendances.Index>(route, payload).pipe(
      map((res: Attendances.Index): Array<Attendance> => res.data)
    );
  }

  show(id: number): Observable<Attendance> {
    const route: string = this.routes.team.attendances.show(id);

    return this.http.get<Attendances.Show>(route).pipe(
      map((res: Attendances.Show): Attendance => res.data)
    );
  }

  create(body: Attendances.New): Observable<Attendance> {
    const route: string = this.routes.team.attendances.index;

    return this.http.post<Attendances.Create>(route, body).pipe(
      map((res: Attendances.Create): Attendance => res.data)
    );
  }

  update(id: number, body: Attendances.Change): Observable<Attendance> {
    const route: string = this.routes.team.attendances.update(id);

    return this.http.put<Attendances.Show>(route, body).pipe(
      map((res: Attendances.Update): Attendance => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.attendances.destroy(id);

    return this.http.delete<Attendances.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
