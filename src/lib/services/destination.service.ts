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
    params: Destinations.Query = {}
  ): Observable<Array<Destination>> {
    switch (type) {
      case DestinationType.Equipment:
        return this.equipmentService.index(params).pipe(
          map(({ data }) => data.map(this.builder.equipment))
        );
      case DestinationType.Location:
        return this.locationService.index(params).pipe(
          map(({ data }) => data.map(this.builder.location))
        );
      case DestinationType.Member:
        return this.memberService.index(params).pipe(
          map(({ data }) => data.map(this.builder.member))
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
        return of(undefined);
    }
  }

  barcode(barcode: string): Observable<Destination> {
    return this.equipmentService.barcode(barcode).pipe(
      map(this.builder.equipment)
    );
  }

  contents(type: DestinationType, id: number): Observable<Array<Destination>> {
    const payload = this.params({ id, type });

    return this.equipmentService.index(payload).pipe(
      map(({ data }) => data.map(this.builder.equipmentContext({ id, type })))
    );
  }

  set(gearId: number, type: DestinationType, id: number): Observable<Equipment> {
    return this.equipmentService.move(gearId, type, id);
  }

  search(
    type: DestinationType,
    query: string,
    params: Destinations.Query = {}
  ): Observable<Array<Destination>> {
    switch (type) {
      case DestinationType.All:
        return forkJoin([
          this.search(DestinationType.Equipment, query, params),
          this.search(DestinationType.Location, query, params),
          this.search(DestinationType.Member, query, params)
        ]).pipe(
          map((res: Array<Array<Destination>>) => res.flat())
        );
      case DestinationType.Equipment:
        return this.equipmentService.search(query, params).pipe(
          map(({ data }) => data.map(this.builder.equipment))
        );
      case DestinationType.Location:
        return this.locationService.search(query, params).pipe(
          map(({ data }) => data.map(this.builder.location))
        );
      case DestinationType.Member:
        return this.memberService.search(query, params).pipe(
          map(({ data }) => data.map(this.builder.member))
        );
      default:
        return of([]);
    }
  }

  /**
   * Context/Query Query Params
   * ===========================================================================
   * Per the issue linked below, the below combination should yield only direct
   * child equipment of the member or location. For example, if a member has a
   * toolkit with tools asssigned, the query would only return the toolkit, not
   * its tools.
   *
   *  - location: { location_id: number, parent_id: null }
   *  - member: { member: number, parent_id: null }
   *
   * @see https://github.com/D4H/decisions-project/issues/4180
   */

  private params({ id, type }: { id: number, type: DestinationType }): object {
    switch (type) {
      case DestinationType.Equipment:
        return { parent_id: id };
      case DestinationType.Location:
        // tslint:disable-next-line no-null-keyword
        return { location_id: id, parent_id: null };
      case DestinationType.Member:
        // tslint:disable-next-line no-null-keyword
        return { member: id, parent_id: null };
      default:
        return {};
    }
  }
}
