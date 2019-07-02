import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { Activity } from '../models';
import { ApiHttpClient } from '../client/api.client';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: API.Activities.Search): Observable<Array<Activity>> {
    const route: string = this.routes.team.activities.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Activities.Index>(route, payload).pipe(
      map((res: API.Activities.Index): Array<Activity> => res.data)
    );
  }

  show(id: number): Observable<Activity> {
    const route: string = this.routes.team.activities.show(id);

    return this.http.get<API.Activities.Show>(route).pipe(
      map((res: API.Activities.Show): Activity => res.data)
    );
  }
}
