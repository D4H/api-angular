import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { CustomField, EntityType } from '../models';
import { Index, CustomFields } from '../api';

@Injectable({ providedIn: ClientModule })
export class CustomFieldService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: CustomFields.Query = {}): Observable<Index<CustomField>> {
    const route: string = this.routes.team.customFields.index;
    const payload: any = { params: query };

    return this.http.get<CustomFields.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  indexEntity(
    entity: EntityType,
    id: number,
    query: CustomFields.Query = {}
  ): Observable<Index<CustomField>> {
    const route: string = this.routes.team.customFields.indexEntity(entity, id);
    const payload: any = { params: query };

    return this.http.get<CustomFields.IndexEntity>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  create(body: CustomFields.New): Observable<CustomField> {
    const route: string = this.routes.team.customFields.index;

    return this.http.post<CustomFields.Show>(route, body).pipe(
      pluck('data')
    );
  }

  show(id: number): Observable<CustomField> {
    const route: string = this.routes.team.customFields.show(id);

    return this.http.get<CustomFields.Show>(route).pipe(
      pluck('data')
    );
  }

  update(id: number, body: CustomFields.Change): Observable<CustomField> {
    const route: string = this.routes.team.customFields.update(id);

    return this.http.put<CustomFields.Show>(route, body).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.customFields.destroy(id);

    return this.http.delete<CustomFields.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
