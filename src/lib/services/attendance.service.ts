import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { Attendance } from '../models';
import { ClientModule } from '../client.module';

@Injectable({ providedIn: ClientModule })
export class AttendanceService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: API.Attendances.Search): Observable<Array<Attendance>> {
    const route: string = this.routes.team.attendances.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Attendances.Index>(route, payload).pipe(
      map((res: API.Attendances.Index): Array<Attendance> => res.data)
    );
  }

  show(id: number): Observable<Attendance> {
    const route: string = this.routes.team.attendances.show(id);

    return this.http.get<API.Attendances.Show>(route).pipe(
      map((res: API.Attendances.Show): Attendance => res.data)
    );
  }

  create(body: API.Attendances.New): Observable<Attendance> {
    const route: string = this.routes.team.attendances.index;

    return this.http.post<API.Attendances.Create>(route, body).pipe(
      map((res: API.Attendances.Create): Attendance => res.data)
    );
  }

  update(id: number, body: API.Attendances.Change): Observable<Attendance> {
    const route: string = this.routes.team.attendances.update(id);

    return this.http.put<API.Attendances.Show>(route, body).pipe(
      map((res: API.Attendances.Update): Attendance => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.attendances.destroy(id);

    return this.http.delete<API.Attendances.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
