import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Index, Searches } from '../api';
import { SearchResult } from '../models';

@Injectable({ providedIn: ClientModule })
export class SearchService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  search(query: Searches.Query = {}): Observable<Index<SearchResult>> {
    const route: string = this.routes.team.search;
    const payload: any = { params: query };

    return this.http.get<Searches.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }
}
