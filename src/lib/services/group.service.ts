import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Group } from '../models';
import { Groups, Index } from '../api';

@Injectable({ providedIn: ClientModule })
export class GroupService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Groups.Query = {}): Observable<Index<Group>> {
    const route: string = this.routes.team.groups.index;
    const payload: any = { params: query };

    return this.http.get<Groups.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Group> {
    const route: string = this.routes.team.groups.show(id);

    return this.http.get<Groups.Show>(route).pipe(
      pluck('data')
    );
  }
}
