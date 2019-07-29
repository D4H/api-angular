import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Role } from '../models';

@Injectable({ providedIn: ClientModule })
export class RoleService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: API.Roles.Search): Observable<Array<Role>> {
    const route: string = this.routes.team.roles.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Roles.Index>(route, payload).pipe(
      map((res: API.Roles.Index): Array<Role> => res.data)
    );
  }

  show(id: number): Observable<Role> {
    const route: string = this.routes.team.roles.show(id);

    return this.http.get<API.Roles.Show>(route).pipe(
      map((res: API.Roles.Show): Role => res.data)
    );
  }
}
