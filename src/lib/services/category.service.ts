import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Category } from '../models';
import { Categories, Index } from '../api';

@Injectable({ providedIn: ClientModule })
export class CategoryService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Categories.Query = {}): Observable<Index<Category>> {
    const route: string = this.routes.team.categories.index;
    const payload: any = { params: query };

    return this.http.get<Categories.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Category> {
    const route: string = this.routes.team.categories.show(id);

    return this.http.get<Categories.Show>(route).pipe(
      pluck('data')
    );
  }

  create(body: Categories.New): Observable<Category> {
    const route: string = this.routes.team.categories.index;

    return this.http.post<Categories.Create>(route, body).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Categories.Change): Observable<Category> {
    const route: string = this.routes.team.categories.update(id);

    return this.http.put<Categories.Show>(route, body).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.categories.destroy(id);

    return this.http.delete<Categories.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
