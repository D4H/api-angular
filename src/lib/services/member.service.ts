import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Group, Member, EmergencyContact, StatusLabel } from '../models';
import { PhotoService } from './photo.service';

@Injectable({ providedIn: ClientModule })
export class MemberService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(search: API.Members.Search = {}): Observable<Array<Member>> {
    const route: string = this.routes.team.members.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Members.Index>(route, payload).pipe(
      map((res: API.Members.Index): Array<Member> => res.data)
    );
  }

  show(id: number | 'me'): Observable<Member> {
    const route: string = this.routes.team.members.show(id);

    return this.http.get<API.Members.Show>(route).pipe(
      map((res: API.Members.Show): Member => res.data)
    );
  }

  update(id: number | 'me', body: API.Members.Change = {}): Observable<Member> {
    const route: string = this.routes.team.members.update(id);

    return this.http.put<API.Members.Update>(route, body).pipe(
      map((res: API.Members.Update): Member => res.data)
    );
  }

  groups(id: number | 'me'): Observable<Array<Group>> {
    const route: string = this.routes.team.members.groups(id);

    return this.http.get<API.Members.Groups>(route).pipe(
      map((res: API.Members.Groups): Array<Group> => res.data)
    );
  }

  image(id: number | 'me', params: API.Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.members.image(id);

    return this.photoService.get(route, params);
  }

  labels(): Observable<API.Members.LabelData> {
    const route: string = this.routes.team.members.labels;

    return this.http.get(route).pipe(
      map((res: API.Members.Labels): API.Members.LabelData => res.data)
    );
  }
}
