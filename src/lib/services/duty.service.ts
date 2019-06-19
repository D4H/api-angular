import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { Duties } from '../routes';
import { Duty } from '../models';

@Injectable({ providedIn: 'root' })
export class DutyService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: Duties.Search): Observable<Array<Duty>> {
    const route: string = this.routes.team.duties.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<Duties.Index>(route, payload).pipe(
      map((res: Duties.Index): Array<Duty> => res.data)
    );
  }

  show(id: number): Observable<Duty> {
    const route: string = this.routes.team.duties.show(id);

    return this.http.get<Duties.Show>(route).pipe(
      map((res: Duties.Show): Duty => res.data)
    );
  }

  create(body: Duties.New): Observable<Duty> {
    const route: string = this.routes.team.duties.index;

    return this.http.post<Duties.Create>(route, body).pipe(
      map((res: Duties.Create): Duty => res.data)
    );
  }

  update(id: number, body: Duties.Change): Observable<Duty> {
    const route: string = this.routes.team.duties.update(id);

    return this.http.put<Duties.Show>(route, body).pipe(
      map((res: Duties.Update): Duty => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.duties.destroy(id);

    return this.http.delete<Duties.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
