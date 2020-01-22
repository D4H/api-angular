import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Category } from '../models';
import { Categories } from '../api';

@Injectable({ providedIn: ClientModule })
export class CategoryService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query?: Categories.Search): Observable<Array<Category>> {
    const route: string = this.routes.team.categories.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Categories.Index>(route, payload).pipe(
      map((res: Categories.Index): Array<Category> => res.data)
    );
  }

  show(id: number): Observable<Category> {
    const route: string = this.routes.team.categories.show(id);

    return this.http.get<Categories.Show>(route).pipe(
      map((res: Categories.Show): Category => res.data)
    );
  }

  create(body: Categories.New): Observable<Category> {
    const route: string = this.routes.team.categories.index;

    return this.http.post<Categories.Create>(route, body).pipe(
      map((res: Categories.Create): Category => res.data)
    );
  }

  update(id: number, body: Categories.Change): Observable<Category> {
    const route: string = this.routes.team.categories.update(id);

    return this.http.put<Categories.Show>(route, body).pipe(
      map((res: Categories.Update): Category => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.categories.destroy(id);

    return this.http.delete<Categories.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
