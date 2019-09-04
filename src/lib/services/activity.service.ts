import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { Activities } from '../resources';
import { Activity } from '../models';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';

@Injectable({ providedIn: ClientModule })
export class ActivityService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: Activities.Search): Observable<Array<Activity>> {
    const route: string = this.routes.team.activities.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<Activities.Index>(route, payload).pipe(
      map((res: Activities.Index): Array<Activity> => res.data)
    );
  }

  show(id: number): Observable<Activity> {
    const route: string = this.routes.team.activities.show(id);

    return this.http.get<Activities.Show>(route).pipe(
      map((res: Activities.Show): Activity => res.data)
    );
  }
}
