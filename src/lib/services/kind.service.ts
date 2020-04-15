import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Kind } from '../models';
import { Kinds, Index } from '../api';

@Injectable({ providedIn: ClientModule })
export class KindService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Kinds.Query = {}): Observable<Index<Kind>> {
    const route: string = this.routes.team.kinds.index;
    const payload: any = { params: query };

    return this.http.get<Kinds.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Kind> {
    const route: string = this.routes.team.kinds.show(id);

    return this.http.get<Kinds.Show>(route).pipe(
      pluck('data')
    );
  }

  create(body: Kinds.New): Observable<Kind> {
    const route: string = this.routes.team.kinds.index;

    return this.http.post<Kinds.Create>(route, body).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Kinds.Change): Observable<Kind> {
    const route: string = this.routes.team.kinds.update(id);

    return this.http.put<Kinds.Show>(route, body).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.kinds.destroy(id);

    return this.http.delete<Kinds.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
