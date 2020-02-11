import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Result } from '../models';
import { InspectionResults } from '../api';

@Injectable({ providedIn: ClientModule })
export class InspectionResultService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: InspectionResults.Search = {}): Observable<Array<Result>> {
    const route: string = this.routes.team.results.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<InspectionResults.Index>(route, payload).pipe(
      map((res: InspectionResults.Index): Array<Result> => res.data)
    );
  }

  show(id: number): Observable<Result> {
    const route: string = this.routes.team.results.show(id);

    return this.http.get<InspectionResults.Show>(route).pipe(
      map((res: InspectionResults.Show): Result => res.data)
    );
  }

  update(id: number, body: InspectionResults.Change = {}): Observable<Result> {
    const route: string = this.routes.team.results.update(id);

    return this.http.put<InspectionResults.Update>(route, body).pipe(
      map((res: InspectionResults.Update): Result => res.data)
    );
  }
}
