import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Duties, Index } from '../api';
import { Duty } from '../models';

@Injectable({ providedIn: ClientModule })
export class DutyService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(query: Duties.Query = {}): Observable<Index<Duty>> {
    const route: string = this.routes.team.duties.index;
    const payload: any = { params: query };

    return this.http.get<Duties.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Duty> {
    const route: string = this.routes.team.duties.show(id);

    return this.http.get<Duties.Show>(route).pipe(
      pluck('data')
    );
  }

  /**
   * If the API "successfully fails" to create a duty, as distinct from an error
   * failure to create a duty, this will be the response data body:
   *
   * @example
   *
   *  {
   *    statusCode: 200,
   *    message: "Successfully processed, but no period was added as it's the same as default."
   *  }
   *
   * This occurs when the user tries to create a Duty period identical to their
   * default Duty settings. The response status is 201 Created. Until such time
   * that we resolve #2737, the service has to check whether the response
   * actually contains the expected record.
   *
   * @see https://github.com/D4H/decisions-project/issues/2737
   */

  create(body: Duties.New): Observable<Duty> {
    const route: string = this.routes.team.duties.index;

    return this.http.post<Duties.Create>(route, body).pipe(
      map(({ data: duty }): Duty => {
        if (Number.isInteger(duty.id)) {
          return duty;
        } else {
          return undefined;
        }
      })
    );
  }

  update(id: number, body: Duties.Change): Observable<Duty> {
    const route: string = this.routes.team.duties.update(id);

    return this.http.put<Duties.Show>(route, body).pipe(
      pluck('data')
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.duties.destroy(id);

    return this.http.delete<Duties.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
