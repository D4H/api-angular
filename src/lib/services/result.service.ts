import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Result } from '../models';
import { Results } from '../api';

@Injectable({ providedIn: ClientModule })
export class ResultService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(
    inspectionId: number,
    query: Results.Search = {}
  ): Observable<Array<Result>> {
    const route: string = this.routes.team.results.index(inspectionId);
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Results.Index>(route, payload).pipe(
      map((res: Results.Index): Array<Result> => res.data)
    );
  }

  show(inspectionId: number, id: number): Observable<Result> {
    const route: string = this.routes.team.results.show(inspectionId, id);

    return this.http.get<Results.Show>(route).pipe(
      map((res: Results.Show): Result => res.data)
    );
  }

  update(
    inspectionId: number,
    id: number,
    body: Results.Change = {}
  ): Observable<Result> {
    const route: string = this.routes.team.results.update(inspectionId, id);

    return this.http.put<Results.Update>(route, body).pipe(
      map((res: Results.Update): Result => res.data)
    );
  }
}
