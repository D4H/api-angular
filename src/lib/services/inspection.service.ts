import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Inspection } from '../models';
import { Inspections } from '../api';

@Injectable({ providedIn: ClientModule })
export class InspectionService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search: Inspections.Search = {}): Observable<Array<Inspection>> {
    const route: string = this.routes.team.inspections.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<Inspections.Index>(route, payload).pipe(
      map((res: Inspections.Index): Array<Inspection> => res.data)
    );
  }

  show(id: number): Observable<Inspection> {
    const route: string = this.routes.team.inspections.show(id);

    return this.http.get<Inspections.Show>(route).pipe(
      map((res: Inspections.Show): Inspection => res.data)
    );
  }

  update(id: number, body: Inspections.Change = {}): Observable<Inspection> {
    const route: string = this.routes.team.inspections.update(id);

    return this.http.put<Inspections.Update>(route, body).pipe(
      map((res: Inspections.Update): Inspection => res.data)
    );
  }
}
