import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { Group } from '../models';

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: API.Groups.Search): Observable<Array<Group>> {
    const route: string = this.routes.team.groups.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Groups.Index>(route, payload).pipe(
      map((res: API.Groups.Index): Array<Group> => res.data)
    );
  }

  show(id: number): Observable<Group> {
    const route: string = this.routes.team.groups.show(id);

    return this.http.get<API.Groups.Show>(route).pipe(
      map((res: API.Groups.Show): Group => res.data)
    );
  }
}
