import { Inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

import { API_ROUTES, HttpOptions, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { DestinationType, Equipment } from '../models';
import { PhotoService } from './photo.service';
import { Gear, Photos } from '../api';

@Injectable({ providedIn: ClientModule })
export class EquipmentService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(query: Gear.Search = {}): Observable<Array<Equipment>> {
    const route: string = this.routes.team.equipment.index;
    const payload: HttpOptions = { params: query as any };

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

  move(
    id: number,
    destinationType: DestinationType,
    destinationId: number
  ): Observable<Equipment> {
    const route: string = this.routes.team.equipment
      .move(id, destinationType, destinationId);

    return this.http.put<Gear.Update>(route, null).pipe(
      map((res: Gear.Update): Equipment => res.data)
    );
  }

  image(id: number, params: Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.equipment.image(id);

    return this.photoService.get(route, { params } as any);
  }

  // Equipment searches are by barcode OR ref. Returns union of two queries.
  search(
    query: string,
    params: Gear.Search = {}
  ): Observable<Array<Equipment>> {
    const route: string = this.routes.team.equipment.index;
    const barcode = { params: { barcode: query, ...params } };
    const ref = { params: { ref: query, ...params } };

    return forkJoin([
      this.http.get<Gear.Index>(route, barcode as any).pipe(
        map((res: Gear.Index): Array<Equipment> => res.data)
      ),
      this.http.get<Gear.Index>(route, ref as any).pipe(
        map((res: Gear.Index): Array<Equipment> => res.data)
      )
    ]).pipe(
      map((data: Array<Array<Equipment>>) => Array.from(new Set(data.flat())))
    );
  }
}
