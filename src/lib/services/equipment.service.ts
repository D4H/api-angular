import { Inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { DestinationType, Equipment } from '../models';
import { Gear, Index, Photos } from '../api';
import { PhotoService } from './photo.service';

@Injectable({ providedIn: ClientModule })
export class EquipmentService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient,
    private readonly photoService: PhotoService
  ) {}

  index(query: Gear.Search = {}): Observable<Index<Equipment>> {
    const route: string = this.routes.team.equipment.index;
    const payload: any = { params: query };

    return this.http.get<Gear.Index>(route, payload).pipe(
      map(({ data, meta: page }) => ({ data, page }))
    );
  }

  show(id: number): Observable<Equipment> {
    const route: string = this.routes.team.equipment.show(id);

    return this.http.get<Gear.Show>(route).pipe(
      pluck('data')
    );
  }

  barcode(barcode: string): Observable<Equipment> {
    const route: string = this.routes.team.equipment.barcode(barcode);

    return this.http.get<Gear.Show>(route).pipe(
      pluck('data')
    );
  }

  ref(ref: string): Observable<Equipment> {
    const route: string = this.routes.team.equipment.ref(ref);

    return this.http.get<Gear.Show>(route).pipe(
      pluck('data')
    );
  }

  update(id: number, body: Gear.Change = {}): Observable<Equipment> {
    const route: string = this.routes.team.equipment.update(id);

    return this.http.put<Gear.Update>(route, body).pipe(
      pluck('data')
    );
  }

  move(
    id: number,
    destinationType: DestinationType,
    destinationId: number
  ): Observable<Equipment> {
    const route: string = this.routes.team.equipment
      .move(id, destinationType, destinationId);

    return this.http.put<Gear.Update>(route, undefined).pipe(
      pluck('data')
    );
  }

  image(id: number, query: Photos.Params = {}): Observable<SafeUrl> {
    const route: string = this.routes.team.equipment.image(id);
    const payload: any = { params: query };

    return this.photoService.get(route, payload);
  }

  // Equipment searches are by barcode OR ref. Returns union of two queries.

  search(query: string, params: Gear.Search = {}): Observable<Index<Equipment>> {
    const route: string = this.routes.team.equipment.index;
    const barcode: any = { params: { ...params, barcode: query } };
    const ref: any = { params: { ...params, ref: query } };

    return forkJoin([
      this.http.get<Gear.Index>(route, barcode).pipe(pluck('data')),
      this.http.get<Gear.Index>(route, ref).pipe(pluck('data'))
    ]).pipe(
      map((data: Array<Array<Equipment>>) => ({
        data: Array.from(new Set(data.flat()))
      }))
    );
  }
}
