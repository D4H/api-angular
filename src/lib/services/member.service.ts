import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Group, Member, EmergencyContact, StatusLabel } from '../models';
import { Members, Photos } from '../api';
import { PhotoService } from './photo.service';

@Injectable({ providedIn: ClientModule })
export class MemberService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(query: Members.Search = {}): Observable<Array<Member>> {
    const route: string = this.routes.team.members.index;
    const payload: HttpOptions = { params: query as any };

    return this.http.get<Members.Index>(route, payload).pipe(
      map((res: Members.Index): Array<Member> => res.data)
    );
  }

  show(id: number | 'me'): Observable<Member> {
    const route: string = this.routes.team.members.show(id);

    return this.http.get<Members.Show>(route).pipe(
      map((res: Members.Show): Member => res.data)
    );
  }

  update(id: number | 'me', body: Members.Change = {}): Observable<Member> {
    const route: string = this.routes.team.members.update(id);

    return this.http.put<Members.Update>(route, body).pipe(
      map((res: Members.Update): Member => res.data)
    );
  }

  groups(id: number | 'me'): Observable<Array<Group>> {
    const route: string = this.routes.team.members.groups(id);

    return this.http.get<Members.Groups>(route).pipe(
      map((res: Members.Groups): Array<Group> => res.data)
    );
  }

  image(id: number | 'me', params: Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.members.image(id);

    return this.photoService.get(route, { params } as any);
  }

  labels(): Observable<Members.LabelData> {
    const route: string = this.routes.team.members.labels;

    return this.http.get(route).pipe(
      map((res: Members.Labels): Members.LabelData => res.data)
    );
  }
}
