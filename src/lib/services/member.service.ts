import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Group, Member, EmergencyContact, StatusLabel } from '../models';
import { Index, Members, Photos } from '../api';
import { PhotoService } from './photo.service';

@Injectable({ providedIn: ClientModule })
export class MemberService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(query: Members.Query = {}): Observable<Index<Member>> {
    const route: string = this.routes.team.members.index;
    const payload: any = { params: query };

    return this.http.get<Members.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number | 'me', params: Members.Params = {}): Observable<Member> {
    const route: string = this.routes.team.members.show(id);
    const payload: any = { params };

    return this.http.get<Members.Show>(route, payload).pipe(
      pluck('data')
    );
  }

  update(id: number | 'me', body: Members.Change = {}): Observable<Member> {
    const route: string = this.routes.team.members.update(id);

    return this.http.put<Members.Update>(route, body).pipe(
      pluck('data')
    );
  }

  groups(id: number | 'me'): Observable<Array<Group>> {
    const route: string = this.routes.team.members.groups(id);

    return this.http.get<Members.Groups>(route).pipe(
      pluck('data')
    );
  }

  image(id: number | 'me', query: Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.members.image(id);
    const payload: any = { params: query };

    return this.photoService.get(route, payload);
  }

  labels(): Observable<Members.LabelData> {
    const route: string = this.routes.team.members.labels;

    return this.http.get(route).pipe(
      pluck('data')
    );
  }

  search(query: string, params: Members.Query = {}): Observable<Index<Member>> {
    const route: string = this.routes.team.members.index;
    const payload: any = { params: { name: query, ...params } };

    return this.http.get<Members.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }
}
