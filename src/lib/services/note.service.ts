import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Note } from '../models';

@Injectable({ providedIn: ClientModule })
export class NoteService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: API.Notes.Search): Observable<Array<Note>> {
    const route: string = this.routes.team.notes.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Notes.Index>(route, payload).pipe(
      map((res: API.Notes.Index): Array<Note> => res.data)
    );
  }

  show(id: number): Observable<Note> {
    const route: string = this.routes.team.notes.show(id);

    return this.http.get<API.Notes.Show>(route).pipe(
      map((res: API.Notes.Show): Note => res.data)
    );
  }

  create(body: API.Notes.New): Observable<Note> {
    const route: string = this.routes.team.notes.index;

    return this.http.post<API.Notes.Create>(route, body).pipe(
      map((res: API.Notes.Create): Note => res.data)
    );
  }

  update(id: number, body: API.Notes.Change): Observable<Note> {
    const route: string = this.routes.team.notes.update(id);

    return this.http.put<API.Notes.Show>(route, body).pipe(
      map((res: API.Notes.Update): Note => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.notes.destroy(id);

    return this.http.delete<API.Notes.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
