import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { Activities, Index } from '../api';
import { Activity } from '../models';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';

@Injectable({ providedIn: ClientModule })
export class ActivityService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(params: Activities.Search = {}): Observable<Index<Activity>> {
    const route: string = this.routes.team.activities.index;
    const payload: any = { params };

    return this.http.get<Activities.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Activity> {
    const route: string = this.routes.team.activities.show(id);

    return this.http.get<Activities.Show>(route).pipe(
      pluck('data')
    );
  }
}
