import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Index, Roles } from '../api';
import { Role } from '../models';

@Injectable({ providedIn: ClientModule })
export class RoleService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query?: Roles.Search): Observable<Index<Role>> {
    const route: string = this.routes.team.roles.index;
    const payload: any = { params: query };

    return this.http.get<Roles.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Role> {
    const route: string = this.routes.team.roles.show(id);

    return this.http.get<Roles.Show>(route).pipe(
      pluck('data')
    );
  }
}
