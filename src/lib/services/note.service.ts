import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Index, Notes } from '../api';
import { Note } from '../models';

@Injectable({ providedIn: ClientModule })
export class NoteService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Notes.Search = {}): Observable<Index<Note>> {
    const route: string = this.routes.team.notes.index;
    const payload: any = { params: query };

    return this.http.get<Notes.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Note> {
    const route: string = this.routes.team.notes.show(id);

    return this.http.get<Notes.Show>(route).pipe(
      pluck('data')
    );
  }

  create(body: Notes.New): Observable<Note> {
    const route: string = this.routes.team.notes.index;

    return this.http.post<Notes.Create>(route, body).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Notes.Change): Observable<Note> {
    const route: string = this.routes.team.notes.update(id);

    return this.http.put<Notes.Show>(route, body).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.notes.destroy(id);

    return this.http.delete<Notes.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
