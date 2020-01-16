import faker from 'faker';
import { Factory, sample } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ClientTestModule } from '../client-test.module';
import { DestinationBuilder } from '../../lib/builders';
import { Destinations } from '../../lib/api';

import {
  Destination,
  DestinationType,
  Equipment,
  Location,
  Member
} from '../../lib/models';

import {
  DestinationService,
  EquipmentService,
  LocationService,
  MemberService
} from '../../lib/services';

describe('DestinationService', () => {
  let builder: DestinationBuilder;
  let equipmentService;
  let locationService;
  let memberService;
  let result$: Observable<any>;
  let service: DestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        DestinationBuilder,
        DestinationService,
        {
          provide: EquipmentService,
          useValue: jasmine.createSpyObj(
            'equipmentService',
            ['barcode', 'index', 'move', 'search', 'show']
          )
        },
        {
          provide: LocationService,
          useValue: jasmine.createSpyObj(
            'locationService',
            ['index', 'search', 'show']
          )
        },
        {
          provide: MemberService,
          useValue: jasmine.createSpyObj(
            'memberService',
            ['index', 'search', 'show']
          )
        }
      ]
    });

    builder = TestBed.get<DestinationBuilder>(DestinationBuilder);
    equipmentService = TestBed.get<EquipmentService>(EquipmentService);
    locationService = TestBed.get<LocationService>(LocationService);
    memberService = TestBed.get<MemberService>(MemberService);
    service = TestBed.get<DestinationService>(DestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    let destinations: Array<Destination>;
    let equipment: Array<Equipment>;
    let locations: Array<Location>;
    let members: Array<Member>;
    let params: Destinations.Search;
    let type: DestinationType;

    beforeEach(() => {
      equipment = Factory.buildList('Equipment');
      locations = Factory.buildList('Location');
      members = Factory.buildList('Member');
      params = { limit: 7, offset: 9 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call equipmentService.index', () => {
      destinations = equipment.map(builder.equipment);
      type = DestinationType.Equipment;
      equipmentService.index.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type, params)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith(params);
    });

    it('should call locationService.index', () => {
      destinations = locations.map(builder.location);
      type = DestinationType.Location;
      locationService.index.and.returnValue(of(locations));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type, params)).toBeObservable(result$);
      expect(locationService.index).toHaveBeenCalledWith(params);
    });

    it('should call locationService.index with defaults', () => {
      destinations = locations.map(builder.location);
      type = DestinationType.Location;
      locationService.index.and.returnValue(of(locations));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type)).toBeObservable(result$);
      expect(locationService.index).toHaveBeenCalledWith({});
    });

    it('should call memberService.index', () => {
      destinations = members.map(builder.member);
      type = DestinationType.Member;
      memberService.index.and.returnValue(of(members));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type, params)).toBeObservable(result$);
      expect(memberService.index).toHaveBeenCalledWith(params);
    });

    it('should not call any service and return null', () => {
      result$ = hot('(a|)', { a: [] });
      expect(service.index(null)).toBeObservable(result$);
      expect(equipmentService.index).not.toHaveBeenCalled();
      expect(locationService.index).not.toHaveBeenCalled();
      expect(memberService.index).not.toHaveBeenCalled();
    });
  });

  describe('show', () => {
    let destination: Destination;
    let equipment: Equipment;
    let id: number;
    let location: Location;
    let member: Member;
    let type: DestinationType;

    beforeEach(() => {
      id = faker.random.number();
      equipment = Factory.build('Equipment');
      location = Factory.build('Location');
      member = Factory.build('Member');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call equipmentService.show', () => {
      destination = builder.equipment(equipment);
      type = DestinationType.Equipment;
      equipmentService.show.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destination });

      expect(service.show(type, id)).toBeObservable(result$);
      expect(equipmentService.show).toHaveBeenCalledWith(id);
    });

    it('should call locationService.show', () => {
      destination = builder.location(location);
      type = DestinationType.Location;
      locationService.show.and.returnValue(of(location));
      result$ = hot('(a|)', { a: destination });

      expect(service.show(type, id)).toBeObservable(result$);
      expect(locationService.show).toHaveBeenCalledWith(id);
    });

    it('should call memberService.show', () => {
      destination = builder.member(member);
      type = DestinationType.Member;
      memberService.show.and.returnValue(of(member));
      result$ = hot('(a|)', { a: destination });

      expect(service.show(type, id)).toBeObservable(result$);
      expect(memberService.show).toHaveBeenCalledWith(id);
    });

    it('should not call any service and return null', () => {
      result$ = hot('(a|)', { a: null });
      expect(service.show(null, id)).toBeObservable(result$);
      expect(equipmentService.show).not.toHaveBeenCalled();
      expect(locationService.show).not.toHaveBeenCalled();
      expect(memberService.show).not.toHaveBeenCalled();
    });
  });

  describe('barcode', () => {
    let barcode: string;
    let destination: Destination;
    let equipment: Equipment;

    beforeEach(() => {
      barcode = faker.random.uuid();
      equipment = Factory.build('Equipment');
      destination = builder.equipment(equipment);
    });

    it('should be a function', () => {
      expect(typeof service.barcode).toBe('function');
    });

    it('should call equipmentService.barcode and return an array of destinations', () => {
      equipmentService.barcode.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destination });
      expect(service.barcode(barcode)).toBeObservable(result$);
      expect(equipmentService.barcode).toHaveBeenCalledWith(barcode);
    });
  });

  describe('contents', () => {
    let destinations: Array<Destination>;
    let equipment: Array<Equipment>;
    let id: number;
    let type: DestinationType;

    beforeEach(() => {
      equipment = Factory.buildList<Equipment>('Equipment');
      id = faker.random.number();
    });

    it('should be a function', () => {
      expect(typeof service.contents).toBe('function');
    });

    it('should call equipmentService.index with parent_id', () => {
      type = DestinationType.Equipment;
      destinations = equipment.map(builder.equipmentContext({ id, type }));
      equipmentService.index.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destinations });
      expect(service.contents(type, id)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith({ parent_id: id });
    });

    it('should call equipmentService.index with location_id', () => {
      type = DestinationType.Location;
      destinations = equipment.map(builder.equipmentContext({ id, type }));
      equipmentService.index.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destinations });
      expect(service.contents(type, id)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith({ location_id: id });
    });

    it('should call equipmentService.index with member', () => {
      type = DestinationType.Member;
      destinations = equipment.map(builder.equipmentContext({ id, type }));
      equipmentService.index.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destinations });
      expect(service.contents(type, id)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith({ member: id });
    });

    it('should call equipmentService.index with {}', () => {
      type = null;
      destinations = equipment.map(builder.equipmentContext({ id, type }));
      equipmentService.index.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destinations });
      expect(service.contents(type, id)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith({});
    });
  });

  describe('search', () => {
    let destinations: Array<Destination>;
    let equipment: Array<Equipment>;
    let locations: Array<Location>;
    let members: Array<Member>;
    let query: string;

    beforeEach(() => {
      equipment = Factory.buildList<Equipment>('Equipment');
      locations = Factory.buildList<Location>('Location');
      members = Factory.buildList<Member>('Member');
      query = faker.random.uuid();

      destinations = [].concat(
        equipment.map(builder.equipment),
        locations.map(builder.location),
        members.map(builder.member)
      );
    });

    it('should be a function', () => {
      expect(typeof service.contents).toBe('function');
    });

    it('should call index functions and return an array of destinations', () => {
      equipmentService.search.and.returnValue(of(equipment));
      locationService.search.and.returnValue(of(locations));
      memberService.search.and.returnValue(of(members));

      result$ = hot('(a|)', { a: destinations });
      expect(service.search(query)).toBeObservable(result$);
      expect(equipmentService.search).toHaveBeenCalledWith(query, {});
      expect(locationService.search).toHaveBeenCalledWith(query, {});
      expect(memberService.search).toHaveBeenCalledWith(query, {});
    });
  });

  describe('set', () => {
    let destination: Destination;
    let equipment: Equipment;
    let id: number;
    let type: DestinationType;

    beforeEach(() => {
      destination = Factory.build<Destination>('Destination');
      equipment = Factory.build<Equipment>('Equipment');
      id = destination.id;
      type = destination.type;
    });

    it('should be a function', () => {
      expect(typeof service.set).toBe('function');
    });

    it('should call equipmentService.move and return equipment', () => {
      equipmentService.move.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: equipment });
      expect(service.set(equipment.id, type, id)).toBeObservable(result$);

      expect(equipmentService.move)
        .toHaveBeenCalledWith(equipment.id, type, id);
    });
  });
});
