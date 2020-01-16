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
import { DestinationBuilder } from '../builders';
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
 * When searching, DestinationService searches for destinations by merging
 * queries to multiple endpoints:
 *
 *  - GET /team/members?name=$QUERY
 *  - GET /team/equipment?barcode=$QUERY
 *  - GET /team/equipment?ref=$QUERY
 *  - GET /team/locations?title=$QUERY
 */

@Injectable({ providedIn: ClientModule })
export class DestinationService {
  constructor(
    private readonly builder: DestinationBuilder,
    private readonly equipmentService: EquipmentService,
    private readonly locationService: LocationService,
    private readonly memberService: MemberService
  ) {}

  index(
    type: DestinationType,
    params: Destinations.Search = {}
  ): Observable<Array<Destination>> {
    switch (type) {
      case DestinationType.Equipment:
        return this.equipmentService.index(params).pipe(
          map(equipment => equipment.map(this.builder.equipment))
        );
      case DestinationType.Location:
        return this.locationService.index(params).pipe(
          map(locations => locations.map(this.builder.location))
        );
      case DestinationType.Member:
        return this.memberService.index(params).pipe(
          map(members => members.map(this.builder.member))
        );
      default:
        return of([]);
    }
  }

  show(type: DestinationType, id: number): Observable<Destination> {
    switch (type) {
      case DestinationType.Equipment:
        return this.equipmentService.show(id).pipe(
          map(this.builder.equipment)
        );
      case DestinationType.Location:
        return this.locationService.show(id).pipe(
          map(this.builder.location)
        );
      case DestinationType.Member:
        return this.memberService.show(id).pipe(map(
          this.builder.member)
        );
      default:
        return of(null);
    }
  }

  barcode(barcode: string): Observable<Destination> {
    return this.equipmentService.barcode(barcode).pipe(
      map(this.builder.equipment)
    );
  }

  contents(type: DestinationType, id: number): Observable<Array<Destination>> {
    const builder = this.builder.equipmentContext({ id, type });
    const params = this.params({ id, type });

    return this.equipmentService.index(params).pipe(
      map(equipment => equipment.map(builder))
    );
  }

  set(
    equipmentId: number,
    type: DestinationType,
    id: number
  ): Observable<Equipment> {
    return this.equipmentService.move(equipmentId, type, id);
  }

  search(
    query: string,
    params: Destinations.Search = {}
  ): Observable<Array<Destination>> {
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

  private params(destination: Partial<Destination>): object {
    switch (destination.type) {
      case DestinationType.Equipment:
        return { parent_id: destination.id };
      case DestinationType.Location:
        return { location_id: destination.id };
      case DestinationType.Member:
        return { member: destination.id };
      default:
        return {};
    }
  }
}
