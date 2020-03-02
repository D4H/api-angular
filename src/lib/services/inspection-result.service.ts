import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Result } from '../models';
import { Index, InspectionResults } from '../api';

@Injectable({ providedIn: ClientModule })
export class InspectionResultService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: InspectionResults.Search = {}): Observable<Index<Result>> {
    const route: string = this.routes.team.results.index;
    const payload: any = { params: query };

    return this.http.get<InspectionResults.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Result> {
    const route: string = this.routes.team.results.show(id);

    return this.http.get<InspectionResults.Show>(route).pipe(
      pluck('data')
    );
  }

  update(id: number, body: InspectionResults.Change = {}): Observable<Result> {
    const route: string = this.routes.team.results.update(id);

    return this.http.put<InspectionResults.Update>(route, body).pipe(
      pluck('data')
    );
  }
}
