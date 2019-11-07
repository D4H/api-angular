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
      headers: this.headers(team)
    };

    return this.http.get<Teams.Show>(route, payload).pipe(
      map((res: Teams.Show): Team => res.data)
    );
  }

  /**
   * Fetch Photo for Team Membership
   * ===========================================================================
   * Although not clearly noted in API documentation, adding the
   * "version=foo" parameter in a request modifies the response:
   *
   *  1. The API will return an image if it has been modified since the time.
   *  2. Else the server will return 204 No Content.
   *
   * The 204 No Content signal comes without CORS headers, and is treated as an
   * error response to boot. This violation of CORS security causes browsers to
   * kill the request without notifying the JavaScript application. Successfully
   * using "?version=foo" ironically causes a programmatic request to blackhole
   * from the point of the JavaScript application.
   *
   * Despite that the intended function of "?version=foo" is cache images, in
   * practice the parameter so completely broken that the only actual use I have
   * found for this has been to /break/ caching behaviour in browsers.
   *
   * Teams aren't RESTful resources e.g. /team/:id/image -> /team/image, with
   * requests differentiated by API bearer token.  Native browsers (Safari and
   * Chrome) are aggressive about caching programmatic blob requests. They
   * ignore the bearer token, so logically different requests will return the
   * wrong cached photo.
   *
   * In order to break caching behaviour and ensure that the browser returns the
   * correct image in all cases, I set version with a date keyed to the team's
   * ID, with a multiplier to magnify differences.
   *
   * @example
   *
   *   new Date(900 * 1000000) // Sun Jan 11 1970 11:00:00 GMT+0100
   *   new Date(901 * 1000000) // Thu Jan 01 1970 01:16:40 GMT+0100
   *
   * This is a necessary terrible, horrible, no good, very bad hack.
   *
   * @see https://api.d4h.org/v2/documentation#operation/getMembershipMembersMemberImage
   * @see https://api.d4h.org/v2/documentation#operation/getMembershipImage
   */

  image(team: Membership, params: Photos.Params = {}): Observable<SafeUrl> {
    const multiplier = 1000000;
    const route: string = this.routes.team.image;

    const options: HttpOptions = {
      headers: this.headers(team),
      params: {
        version: new Date(Number(team.unit.id) * multiplier),
        ...params as any
      }
    };

    return this.photoService.get(route, options);
  }

  settings(team: Membership, setting: Setting): Observable<SettingData> {
    const route: string = this.routes.team.settings;

    const options: HttpOptions = {
      headers: this.headers(team),
      params: { setting }
    };

    return this.http.get<Teams.Setting>(route, options).pipe(
      map((res: Teams.Setting): SettingData => res.data)
    );
  }

  private headers(team: Membership): { Authorization: string } {
    return {
      Authorization: `Bearer ${team.token}`
    };
  }
}
