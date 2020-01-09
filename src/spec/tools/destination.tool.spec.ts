import { Factory } from '@d4h/testing';
import { TestBed } from '@angular/core/testing';

import {
  Destination,
  DestinationType,
  Equipment,
  Member,
  Location
} from '../../lib/models';

import { DestinationBuilder } from '../../lib/tools';

describe('DestinationBuilder', () => {
  let builder: DestinationBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DestinationBuilder
      ]
    });

    builder = TestBed.get<DestinationBuilder>(DestinationBuilder);
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  describe('equipment', () => {
    let equipment: Equipment;

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
    });

    it('should be a function', () => {
      expect(typeof builder.equipment).toBe('function');
    });

    it('should convert Equipment to Destination', () => {
      expect(builder.equipment(equipment)).toEqual({
        description: equipment.ref,
        id: equipment.id,
        title: equipment.title,
        type: DestinationType.Equipment
      });
    });
  });

  describe('equipmentContext', () => {
    let destination: Destination;
    let equipment: Equipment;

    beforeEach(() => {
      destination = Factory.build<Destination>('Destination');
      equipment = Factory.build<Equipment>('Equipment');
    });

    it('should be a function', () => {
      expect(typeof builder.equipmentContext).toBe('function');
    });

    it('should convert Equipment to Destination', () => {
      expect(builder.equipmentContext(destination)(equipment)).toEqual({
        context: { id: destination.id, type: destination.type },
        description: equipment.ref,
        id: equipment.id,
        title: equipment.title,
        type: DestinationType.Equipment
      });
    });
  });

  describe('location', () => {
    let location: Location;

    beforeEach(() => {
      location = Factory.build<Location>('Location');
    });

    it('should be a function', () => {
      expect(typeof builder.location).toBe('function');
    });

    it('should convert Location to Destination', () => {
      expect(builder.location(location)).toEqual({
        description: location.bundle,
        id: location.id,
        title: location.title,
        type: DestinationType.Location
      });
    });
  });

  describe('member', () => {
    let member: Member;

    beforeEach(() => {
      member = Factory.build<Member>('Member');
    });

    it('should be a function', () => {
      expect(typeof builder.member).toBe('function');
    });

    it('should convert Member to Destination', () => {
      expect(builder.member(member)).toEqual({
        description: member.position,
        id: member.id,
        title: member.name,
        type: DestinationType.Member
      });
    });
  });

  describe('payload', () => {
    let destination: Destination;

    beforeEach(() => {
      destination = Factory.build<Destination>('Destination');
    });

    it('should be a function', () => {
      expect(typeof builder.payload).toBe('function');
    });

    it('should return { parent_id: destination.id }', () => {
      destination.type = DestinationType.Equipment;
      expect(builder.payload(destination)).toEqual({ parent_id: destination.id });
    });

    it('should return { location_id: destination.id }', () => {
      destination.type = DestinationType.Location;
      expect(builder.payload(destination)).toEqual({ location_id: destination.id });
    });

    it('should return { member: destination.id }', () => {
      destination.type = DestinationType.Member;
      expect(builder.payload(destination)).toEqual({ member: destination.id });
    });

    it('should return {}', () => {
      destination.type = null;
      expect(builder.payload(destination)).toEqual({});
    });
  });
});
