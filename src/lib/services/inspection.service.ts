import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

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

  index(query: Inspections.Search = {}): Observable<Array<Inspection>> {
    const route: string = this.routes.team.inspections.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Inspections.Index>(route, payload).pipe(
      pluck('data')
    );
  }

  show(id: number): Observable<Inspection> {
    const route: string = this.routes.team.inspections.show(id);

    return this.http.get<Inspections.Show>(route).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Inspections.Change = {}): Observable<Inspection> {
    const route: string = this.routes.team.inspections.update(id);

    return this.http.put<Inspections.Update>(route, body).pipe(
      pluck('data')
    );
  }
}
