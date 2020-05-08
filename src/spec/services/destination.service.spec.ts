// tslint:disable no-null-keyword

import faker from 'faker';
import { Factory } from '@d4h/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';

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

    builder = TestBed.get(DestinationBuilder);
    equipmentService = TestBed.get(EquipmentService);
    locationService = TestBed.get(LocationService);
    memberService = TestBed.get(MemberService);
    service = TestBed.get(DestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    let destinations: Array<Destination>;
    let equipment: Array<Equipment>;
    let locations: Array<Location>;
    let members: Array<Member>;
    let params: Destinations.Query;
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
      equipmentService.index.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type, params)).toBeObservable(result$);
      expect(equipmentService.index).toHaveBeenCalledWith(params);
    });

    it('should call locationService.index', () => {
      destinations = locations.map(builder.location);
      type = DestinationType.Location;
      locationService.index.and.returnValue(of({ data: locations }));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type, params)).toBeObservable(result$);
      expect(locationService.index).toHaveBeenCalledWith(params);
    });

    it('should call locationService.index with defaults', () => {
      destinations = locations.map(builder.location);
      type = DestinationType.Location;
      locationService.index.and.returnValue(of({ data: locations }));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type)).toBeObservable(result$);
      expect(locationService.index).toHaveBeenCalledWith({});
    });

    it('should call memberService.index', () => {
      destinations = members.map(builder.member);
      type = DestinationType.Member;
      memberService.index.and.returnValue(of({ data: members }));
      result$ = hot('(a|)', { a: destinations });

      expect(service.index(type, params)).toBeObservable(result$);
      expect(memberService.index).toHaveBeenCalledWith(params);
    });

    it('should not call any service and return undefined', () => {
      result$ = hot('(a|)', { a: [] });
      expect(service.index(undefined)).toBeObservable(result$);
      expect(equipmentService.index).not.toHaveBeenCalled();
      expect(locationService.index).not.toHaveBeenCalled();
      expect(memberService.index).not.toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    describe('DestinationType.Equipment', () => {
      let destination: Destination;
      let entity: { id: number, type: DestinationType };
      let equipment: Equipment;

      beforeEach(() => {
        equipment = Factory.build('Equipment');
        entity = { id: equipment.id, type: DestinationType.Equipment };
        destination = builder.equipment(equipment);
      });

      it('should call equipmentService.show', () => {
        equipmentService.show.and.returnValue(of(equipment));
        result$ = hot('(a|)', { a: destination });
        expect(service.show(entity)).toBeObservable(result$);
        expect(equipmentService.show).toHaveBeenCalledWith(entity.id);
      });
    });

    describe('DestinationType.Location', () => {
      let destination: Destination;
      let entity: { id: number, type: DestinationType };
      let location: Location;

      beforeEach(() => {
        location = Factory.build('Location');
        entity = { id: location.id, type: DestinationType.Location };
        destination = builder.location(location);
      });

      it('should call locationService.show', () => {
        locationService.show.and.returnValue(of(location));
        result$ = hot('(a|)', { a: destination });
        expect(service.show(entity)).toBeObservable(result$);
        expect(locationService.show).toHaveBeenCalledWith(entity.id);
      });
    });

    describe('DestinationType.Member', () => {
      let destination: Destination;
      let entity: { id: number, type: DestinationType };
      let member: Member;

      beforeEach(() => {
        member = Factory.build('Member');
        entity = { id: member.id, type: DestinationType.Member };
        destination = builder.member(member);
      });

      it('should call memberService.show', () => {
        memberService.show.and.returnValue(of(member));
        result$ = hot('(a|)', { a: destination });
        expect(service.show(entity)).toBeObservable(result$);
        expect(memberService.show).toHaveBeenCalledWith(entity.id);
      });
    });

    describe('DestinationType.All', () => {
      let entity: { id: number, type: DestinationType };

      beforeEach(() => {
        entity = { id: faker.random.number(), type: DestinationType.All };
      });

      it('should not call any service and return undefined', () => {
        result$ = hot('(a|)', { a: undefined });
        expect(service.show(entity)).toBeObservable(result$);
        expect(equipmentService.show).not.toHaveBeenCalled();
        expect(locationService.show).not.toHaveBeenCalled();
        expect(memberService.show).not.toHaveBeenCalled();
      });
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
    it('should be a function', () => {
      expect(typeof service.contents).toBe('function');
    });

    describe('DestinationType.Equipment', () => {
      let destinations: Array<Destination>;
      let parent: { id: number, type: DestinationType };
      let equipment: Array<Equipment>;

      beforeEach(() => {
        parent = { id: faker.random.number(), type: DestinationType.Equipment };
        equipment = Factory.buildList('Equipment');
        destinations = equipment.map(item => ({ ...builder.equipment(item), parent }));
      });

      it('should call equipmentService.index with parent_id', () => {
        equipmentService.index.and.returnValue(of({ data: equipment }));
        result$ = hot('(a|)', { a: destinations });
        expect(service.contents(parent)).toBeObservable(result$);
        expect(equipmentService.index).toHaveBeenCalledWith({ parent_id: parent.id });
      });
    });

    describe('DestinationType.Location', () => {
      let destinations: Array<Destination>;
      let parent: { id: number, type: DestinationType };
      let equipment: Array<Equipment>;

      beforeEach(() => {
        parent = { id: faker.random.number(), type: DestinationType.Location };
        equipment = Factory.buildList('Equipment');
        destinations = equipment.map(item => ({ ...builder.equipment(item), parent }));
      });

      it('should call equipmentService.index with location_id', () => {
        equipmentService.index.and.returnValue(of({ data: equipment }));
        result$ = hot('(a|)', { a: destinations });
        expect(service.contents(parent)).toBeObservable(result$);
        expect(equipmentService.index).toHaveBeenCalledWith({ location_id: parent.id, parent_id: null });
      });
    });

    describe('DestinationType.Member', () => {
      let destinations: Array<Destination>;
      let parent: { id: number, type: DestinationType };
      let equipment: Array<Equipment>;

      beforeEach(() => {
        parent = { id: faker.random.number(), type: DestinationType.Member };
        equipment = Factory.buildList('Equipment');
        destinations = equipment.map(item => ({ ...builder.equipment(item), parent }));
      });

      it('should call equipmentService.index with member', () => {
        equipmentService.index.and.returnValue(of({ data: equipment }));
        result$ = hot('(a|)', { a: destinations });
        expect(service.contents(parent)).toBeObservable(result$);
        expect(equipmentService.index).toHaveBeenCalledWith({ member: parent.id, parent_id: null });
      });
    });

    describe('DestinationType.All', () => {
      let parent: { id: number, type: DestinationType };

      beforeEach(() => {
        parent = { id: faker.random.number(), type: DestinationType.All };
      });

      it('should not call any service and return []', () => {
        result$ = hot('(a|)', { a: [] });
        expect(service.contents(parent)).toBeObservable(result$);
        expect(equipmentService.index).not.toHaveBeenCalled();
      });
    });
  });

  describe('search', () => {
    let destinations: Array<Destination>;
    let equipment: Array<Equipment>;
    let locations: Array<Location>;
    let members: Array<Member>;
    let query: string;
    let type: DestinationType;

    beforeEach(() => {
      equipment = Factory.buildList('Equipment');
      locations = Factory.buildList('Location');
      members = Factory.buildList('Member');
      query = faker.random.uuid();
    });

    it('should be a function', () => {
      expect(typeof service.contents).toBe('function');
    });

    describe('DestinationType.All', () => {
      it('should call all services', () => {
        type = DestinationType.All;

        destinations = [].concat(
          equipment.map(builder.equipment),
          locations.map(builder.location),
          members.map(builder.member)
        );

        equipmentService.search.and.returnValue(of({ data: equipment }));
        locationService.search.and.returnValue(of({ data: locations }));
        memberService.search.and.returnValue(of({ data: members }));
        result$ = hot('(a|)', { a: destinations });

        expect(service.search(DestinationType.All, query)).toBeObservable(result$);
        expect(equipmentService.search).toHaveBeenCalledWith(query, {});
        expect(locationService.search).toHaveBeenCalledWith(query, {});
        expect(memberService.search).toHaveBeenCalledWith(query, {});
      });
    });

    describe('DestinationType.Equipment', () => {
      it('should call equipmentService', () => {
        type = DestinationType.Equipment;
        destinations = equipment.map(builder.equipment);
        equipmentService.search.and.returnValue(of({ data: equipment }));
        result$ = hot('(a|)', { a: destinations });
        expect(service.search(type, query)).toBeObservable(result$);
        expect(equipmentService.search).toHaveBeenCalledWith(query, {});
      });
    });

    describe('DestinationType.Location', () => {
      it('should call locationService', () => {
        type = DestinationType.Location;
        destinations = locations.map(builder.location);
        locationService.search.and.returnValue(of({ data: locations }));
        result$ = hot('(a|)', { a: destinations });
        expect(service.search(type, query)).toBeObservable(result$);
        expect(locationService.search).toHaveBeenCalledWith(query, {});
      });
    });

    describe('DestinationType.Member', () => {
      it('should call memberService with DestinationType.Member', () => {
        type = DestinationType.Member;
        destinations = members.map(builder.member);
        memberService.search.and.returnValue(of({ data: members }));
        result$ = hot('(a|)', { a: destinations });
        expect(service.search(type, query)).toBeObservable(result$);
        expect(memberService.search).toHaveBeenCalledWith(query, {});
      });
    });

    describe('no destination type', () => {
      it('should return [] and call no services by default', () => {
        result$ = hot('(a|)', { a: [] });
        expect(service.search(undefined, query)).toBeObservable(result$);
        expect(equipmentService.search).not.toHaveBeenCalled();
        expect(locationService.search).not.toHaveBeenCalled();
        expect(memberService.search).not.toHaveBeenCalled();
      });
    });
  });

  describe('set', () => {
    let destination: Destination;
    let equipment: Equipment;
    let entity: { id: number, type: DestinationType };

    beforeEach(() => {
      destination = Factory.build('Destination');
      equipment = Factory.build('Equipment');
      ({ entity } = destination);
    });

    it('should be a function', () => {
      expect(typeof service.set).toBe('function');
    });

    it('should call equipmentService.move and return equipment', () => {
      equipmentService.move.and.returnValue(of(equipment));
      result$ = hot('(a|)', { a: equipment });
      expect(service.set(equipment.id, entity)).toBeObservable(result$);

      expect(equipmentService.move)
        .toHaveBeenCalledWith(equipment.id, entity.type, entity.id);
    });
  });
});
