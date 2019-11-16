import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { InspectionResults } from '../api';
import { Result } from '../models';

@Injectable({ providedIn: ClientModule })
export class ResultService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(inspectionId: number, query: InspectionResults.Search = {}): Observable<Array<Result>> {
    const route: string = this.routes.team.results.index(inspectionId);
    const payload: HttpOptions = { params: query as any };

    return this.http.get<InspectionResults.Index>(route, payload).pipe(
      map((res: InspectionResults.Index): Array<Result> => res.data)
    );
  }

  show(inspectionId: number, id: number): Observable<Result> {
    const route: string = this.routes.team.results.show(inspectionId, id);

    return this.http.get<InspectionResults.Show>(route).pipe(
      map((res: InspectionResults.Show): Result => res.data)
    );
  }

  update(inspectionId: number, id: number, body: InspectionResults.Change = {}): Observable<Result> {
    const route: string = this.routes.team.results.update(inspectionId, id);

    return this.http.put<InspectionResults.Update>(route, body).pipe(
      map((res: InspectionResults.Update): Result => res.data)
    );
  }
}
