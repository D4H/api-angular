import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Group } from '../models';
import { Groups } from '../api';

@Injectable({ providedIn: ClientModule })
export class GroupService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query?: Groups.Search): Observable<Array<Group>> {
    const route: string = this.routes.team.groups.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Groups.Index>(route, payload).pipe(
      map((res: Groups.Index): Array<Group> => res.data)
    );
  }

  show(id: number): Observable<Group> {
    const route: string = this.routes.team.groups.show(id);

    return this.http.get<Groups.Show>(route).pipe(
      map((res: Groups.Show): Group => res.data)
    );
  }
}
