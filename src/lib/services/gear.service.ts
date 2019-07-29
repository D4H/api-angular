import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

import * as API from '../resources';
import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Equipment } from '../models';
import { PhotoService } from './photo.service';

@Injectable({ providedIn: ClientModule })
export class GearService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(search: API.Gear.Search = {}): Observable<Array<Equipment>> {
    const route: string = this.routes.team.gear.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<API.Gear.Index>(route, payload).pipe(
      map((res: API.Gear.Index): Array<Equipment> => res.data)
    );
  }

  show(id: number): Observable<Equipment> {
    const route: string = this.routes.team.gear.show(id);

    return this.http.get<API.Gear.Show>(route).pipe(
      map((res: API.Gear.Show): Equipment => res.data)
    );
  }

  update(id: number, body: API.Gear.Change = {}): Observable<Equipment> {
    const route: string = this.routes.team.gear.update(id);

    return this.http.put<API.Gear.Update>(route, body).pipe(
      map((res: API.Gear.Update): Equipment => res.data)
    );
  }

  image(id: number, params: API.Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.members.image(id);

    return this.photoService.get(route, params);
  }
}
