import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ClientTestModule } from '../client-test.module';
import { DestinationBuilder } from '../../lib/tools';
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
          useValue: jasmine.createSpyObj('equipmentService', [
            'barcode',
            'index',
            'search',
            'update'
          ])
        },
        {
          provide: LocationService,
          useValue: jasmine.createSpyObj('locationService', ['index', 'search'])
        },
        {
          provide: MemberService,
          useValue: jasmine.createSpyObj('memberService', ['search'])
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
    let locations: Array<Location>;

    beforeEach(() => {
      locations = Factory.buildList<Location>('Location');
      destinations = locations.map(builder.location);
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call locationService.index and return an array of destinations', () => {
      locationService.index.and.returnValue(of(locations));
      result$ = hot('(a|)', { a: destinations });
      expect(service.index()).toBeObservable(result$);
      expect(locationService.index).toHaveBeenCalledWith({});
    });
  });

  describe('contents', () => {
    let context: { id: number, type: DestinationType };
    let destination: Destination;
    let destinations: Array<Destination>;
    let equipment: Array<Equipment>;

    beforeEach(() => {
      destination = Factory.build<Destination>('Destination');
      context = { id: destination.id, type: destination.type };
      equipment = Factory.buildList<Equipment>('Equipment');
      destinations = equipment.map(builder.equipmentContext(context));
    });

    it('should be a function', () => {
      expect(typeof service.contents).toBe('function');
    });

    it('should call equipmentService.index and return an array of destinations', () => {
      equipmentService.index.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: destinations });
      expect(service.contents(destination)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith(builder.payload(destination));
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

    beforeEach(() => {
      destination = Factory.build<Destination>('Destination');
      equipment = Factory.build<Equipment>('Equipment');
    });

    it('should be a function', () => {
      expect(typeof service.set).toBe('function');
    });

    it('should call equipmentService.update and return equipment', () => {
      equipmentService.update.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: equipment });
      expect(service.set(equipment, destination)).toBeObservable(result$);

      expect(equipmentService.update)
        .toHaveBeenCalledWith(equipment.id, builder.payload(destination));
    });
  });
});
