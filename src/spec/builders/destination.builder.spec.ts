import { Factory } from '@d4h/testing';
import { TestBed } from '@angular/core/testing';

import {
  Destination,
  DestinationType,
  Equipment,
  EquipmentType,
  Member,
  Location
} from '../../lib/models';

import { DestinationBuilder } from '../../lib/builders';

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
        description: `#${equipment.ref}`,
        id: equipment.id,
        title: equipment.title,
        type: DestinationType.Equipment,
        unassignable: equipment.type === EquipmentType.Supply
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
        description: `#${equipment.ref}`,
        id: equipment.id,
        title: equipment.title,
        type: DestinationType.Equipment,
        unassignable: equipment.type === EquipmentType.Supply
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
        type: DestinationType.Location,
        unassignable: false
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
        type: DestinationType.Member,
        unassignable: false
      });
    });
  });
});
