import { Inject, Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Destination,
  DestinationType,
  Equipment,
  Location,
  Member
} from '../models';

import { ClientModule } from '../client.module';
import { DestinationBuilder } from '../tools';
import { Destinations } from '../api';
import { EquipmentService } from './equipment.service';
import { LocationService } from './location.service';
import { MemberService } from './member.service';

/**
 * Destination Service
 * =============================================================================
 * A Destination is a union of
 *
 *  - Equipment: Put a wrench in a toolkit.
 *  - Location: Put the toolkit on a shelf.
 *  - Member: Give the toolkit to a member.
 *
 * when one moves an item of Equipment to a new location. Users can browse
 * different locations, see the equipment contents of a destination, and assign
 * an item to that new destination.
 */

@Injectable({ providedIn: ClientModule })
export class DestinationService {
  constructor(
    private readonly builder: DestinationBuilder,
    private readonly equipmentService: EquipmentService,
    private readonly locationService: LocationService,
    private readonly memberService: MemberService
  ) {}

  // TODO: Temporary. Will eventually permit query-by-type and limit/offset.
  index(params: Destinations.Search = {}): Observable<Array<Destination>> {
    return this.locationService.index(params).pipe(
      map(locations => locations.map(this.builder.location))
    );
  }

  contents(destination: Partial<Destination>): Observable<Array<Destination>> {
    const payload = this.builder.payload(destination);

    return this.equipmentService.index(payload).pipe(
      map(equipment => equipment.map(this.builder.equipmentContext(destination)))
    );
  }

  barcode(barcode: string): Observable<Destination> {
    return this.equipmentService.barcode(barcode).pipe(
      map(this.builder.equipment)
    );
  }

  search(query: string, params: Destinations.Search = {}): Observable<Array<Destination>> {
    return forkJoin([
      this.equipmentService.search(query, params).pipe(
        map(equipment => equipment.map(this.builder.equipment))
      ),
      this.locationService.search(query, params).pipe(
        map(locations => locations.map(this.builder.location))
      ),
      this.memberService.search(query, params).pipe(
        map(members => members.map(this.builder.member))
      )
    ]).pipe(
      map((res: Array<Array<Destination>>) => res.flat())
    );
  }

  set(equipment: Equipment, destination: Partial<Destination>): Observable<Equipment> {
    const payload = this.builder.payload(destination);

    return this.equipmentService.update(equipment.id, payload);
  }
}
