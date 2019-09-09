import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { Equipment } from '../models';
import { PhotoService } from './photo.service';
import { Gear, Photos } from '../resources';

@Injectable({ providedIn: ClientModule })
export class EquipmentService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(search: Gear.Search = {}): Observable<Array<Equipment>> {
    const route: string = this.routes.team.equipment.index;
    const payload: HttpOptions = { params: search as any };

    return this.http.get<Gear.Index>(route, payload).pipe(
      map((res: Gear.Index): Array<Equipment> => res.data)
    );
  }

  show(id: number): Observable<Equipment> {
    const route: string = this.routes.team.equipment.show(id);

    return this.http.get<Gear.Show>(route).pipe(
      map((res: Gear.Show): Equipment => res.data)
    );
  }

  barcode(barcode: string): Observable<Equipment> {
    const route: string = this.routes.team.equipment.barcode(barcode);

    return this.http.get<Gear.Show>(route).pipe(
      map((res: Gear.Show): Equipment => res.data)
    );
  }

  ref(ref: string): Observable<Equipment> {
    const route: string = this.routes.team.equipment.ref(ref);

    return this.http.get<Gear.Show>(route).pipe(
      map((res: Gear.Show): Equipment => res.data)
    );
  }

  update(id: number, body: Gear.Change = {}): Observable<Equipment> {
    const route: string = this.routes.team.equipment.update(id);

    return this.http.put<Gear.Update>(route, body).pipe(
      map((res: Gear.Update): Equipment => res.data)
    );
  }

  image(id: number, params: Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.equipment.image(id);

    return this.photoService.get(route, params);
  }
}
