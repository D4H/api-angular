import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Repair } from '../models';
import { Repairs } from '../api';

@Injectable({ providedIn: ClientModule })
export class RepairService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search: Repairs.Search = {}): Observable<Array<Repair>> {
    const route: string = this.routes.team.repairs.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<Repairs.Index>(route, payload).pipe(
      map((res: Repairs.Index): Array<Repair> => res.data)
    );
  }

  show(id: number): Observable<Repair> {
    const route: string = this.routes.team.repairs.show(id);

    return this.http.get<Repairs.Show>(route).pipe(
      map((res: Repairs.Show): Repair => res.data)
    );
  }

  create(body: Repairs.New): Observable<Repair> {
    const route: string = this.routes.team.repairs.index;

    return this.http.post<Repairs.Create>(route, body).pipe(
      map((res: Repairs.Create): Repair => res.data)
    );
  }

  update(id: number, body: Repairs.Change = {}): Observable<Repair> {
    const route: string = this.routes.team.repairs.update(id);

    return this.http.put<Repairs.Update>(route, body).pipe(
      map((res: Repairs.Update): Repair => res.data)
    );
  }
}
