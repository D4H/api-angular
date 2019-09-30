import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { InspectionItem } from '../models';
import { InspectionItems } from '../resources';

@Injectable({ providedIn: ClientModule })
export class InspectionItemService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  index(
    inspectionId: number,
    search: InspectionItems.Search = {}
  ): Observable<Array<InspectionItem>> {
    const route: string = this.routes.team.inspectionItems.index(inspectionId);
    const payload: HttpOptions = { params: search as any };

    return this.http.get<InspectionItems.Index>(route, payload).pipe(
      map((res: InspectionItems.Index): Array<InspectionItem> => res.data)
    );
  }

  show(
    inspectionId: number, id: number
  ): Observable<InspectionItem> {
    const route: string = this.routes.team.inspectionItems.show(inspectionId, id);

    return this.http.get<InspectionItems.Show>(route).pipe(
      map((res: InspectionItems.Show): InspectionItem => res.data)
    );
  }

  update(
    inspectionId: number,
    id: number,
    body: InspectionItems.Change = {}
  ): Observable<InspectionItem> {
    const route: string = this.routes.team.inspectionItems.update(inspectionId, id);

    return this.http.put<InspectionItems.Update>(route, body).pipe(
      map((res: InspectionItems.Update): InspectionItem => res.data)
    );
  }
}
