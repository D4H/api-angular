import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Location } from '../models';
import { Locations } from '../api';

@Injectable({ providedIn: ClientModule })
export class LocationService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query?: Locations.Search): Observable<Array<Location>> {
    const route: string = this.routes.team.locations.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Locations.Index>(route, payload).pipe(
      map((res: Locations.Index): Array<Location> => res.data)
    );
  }

  show(id: number): Observable<Location> {
    const route: string = this.routes.team.locations.show(id);

    return this.http.get<Locations.Show>(route).pipe(
      map((res: Locations.Show): Location => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.locations.destroy(id);

    return this.http.delete<Locations.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
