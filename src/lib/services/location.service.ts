import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Location } from '../models';
import { Index, Locations } from '../api';

@Injectable({ providedIn: ClientModule })
export class LocationService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Locations.Search = {}): Observable<Index<Location>> {
    const route: string = this.routes.team.locations.index;
    const payload: any = { params: query };

    return this.http.get<Locations.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Location> {
    const route: string = this.routes.team.locations.show(id);

    return this.http.get<Locations.Show>(route).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.locations.destroy(id);

    return this.http.delete<Locations.Destroy>(route).pipe(
      map((): number => id)
    );
  }

  search(query: string, params: Locations.Search = {}): Observable<Index<Location>> {
    const route: string = this.routes.team.locations.index;
    const payload: any = { params: { title: query, ...params } };

    return this.http.get<Locations.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }
}
