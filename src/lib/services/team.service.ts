import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Membership, Setting, SettingData, Team } from '../models';
import { PhotoService } from './photo.service';
import { Photos, Teams } from '../api';

/**
 * Membership Team/Organisation Service
 * =============================================================================
 * The D4H API client issues all requests in the context of the injected eam or
 * organisation token, as is appropriate per route. Querying a team resource
 * directly is effectively an override of that process, by setting the bearer
 * token to that of the passed team.
 *
 * Remember that teams aren't RESTful resources. Instead of accessing e.g.
 * /team/:id/members, you access /team/members, with requests to different teams
 * differentiated by header bearer token.
 */

@Injectable({ providedIn: ClientModule })
export class TeamService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    protected readonly http: ApiHttpClient,
    protected readonly photoService: PhotoService
  ) {}

  show(team: Membership): Observable<Team> {
    const route: string = this.routes.team.show(team.unit.id);

    const payload: HttpOptions = {
      headers: { Authorization: `Bearer ${team.token}` }
    };

    return this.http.get<Teams.Show>(route, payload).pipe(
      map((res: Teams.Show): Team => res.data)
    );
  }

  image(team: Membership, params: Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.image;

    return this.photoService.membership(route, team, params);
  }

  settings(team: Membership, setting: Setting): Observable<SettingData> {
    const route: string = this.routes.team.settings;

    const options: HttpOptions = {
      headers: { Authorization: `Bearer ${team.token}` },
      params: { setting }
    };

    return this.http.get<Teams.Setting>(route, options).pipe(
      map((res: Teams.Setting): SettingData => res.data)
    );
  }
}
