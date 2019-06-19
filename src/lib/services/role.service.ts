import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { Role } from '../models';
import { Roles } from '../routes';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: Roles.Search): Observable<Array<Role>> {
    const route: string = this.routes.team.roles.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<Roles.Index>(route, payload).pipe(
      map((res: Roles.Index): Array<Role> => res.data)
    );
  }

  show(id: number): Observable<Role> {
    const route: string = this.routes.team.roles.show(id);

    return this.http.get<Roles.Show>(route).pipe(
      map((res: Roles.Show): Role => res.data)
    );
  }
}
