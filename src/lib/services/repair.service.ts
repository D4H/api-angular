import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Index, Repairs } from '../api';
import { Repair } from '../models';

@Injectable({ providedIn: ClientModule })
export class RepairService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Repairs.Query = {}): Observable<Index<Repair>> {
    const route: string = this.routes.team.repairs.index;
    const payload: any = { params: query };

    return this.http.get<Repairs.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Repair> {
    const route: string = this.routes.team.repairs.show(id);

    return this.http.get<Repairs.Show>(route).pipe(
      pluck('data')
    );
  }

  create(body: Repairs.New): Observable<Repair> {
    const route: string = this.routes.team.repairs.index;

    return this.http.post<Repairs.Create>(route, body).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Repairs.Change = {}): Observable<Repair> {
    const route: string = this.routes.team.repairs.update(id);

    return this.http.put<Repairs.Update>(route, body).pipe(
      pluck('data')
    );
  }
}
