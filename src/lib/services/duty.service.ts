import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Duty } from '../models';

@Injectable({ providedIn: ClientModule })
export class DutyService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(search?: API.Duties.Search): Observable<Array<Duty>> {
    const route: string = this.routes.team.duties.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Duties.Index>(route, payload).pipe(
      map((res: API.Duties.Index): Array<Duty> => res.data)
    );
  }

  show(id: number): Observable<Duty> {
    const route: string = this.routes.team.duties.show(id);

    return this.http.get<API.Duties.Show>(route).pipe(
      map((res: API.Duties.Show): Duty => res.data)
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

  create(body: API.Duties.New): Observable<Duty> {
    const route: string = this.routes.team.duties.index;

    return this.http.post<API.Duties.Create>(route, body).pipe(
      map((res: API.Duties.Show): Duty => {
        if (Number.isInteger(res.data.id)) {
          return res.data;
        } else {
          return undefined;
        }
      })
    );
  }

  update(id: number, body: API.Duties.Change): Observable<Duty> {
    const route: string = this.routes.team.duties.update(id);

    return this.http.put<API.Duties.Show>(route, body).pipe(
      map((res: API.Duties.Update): Duty => res.data)
    );
  }

  destroy(id: number): Observable<number> {
    const route: string = this.routes.team.duties.destroy(id);

    return this.http.delete<API.Duties.Destroy>(route).pipe(
      map((): number => id)
    );
  }
}
