import { Factory } from '@d4h/testing';
import { TestBed } from '@angular/core/testing';

import {
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

    builder = TestBed.get(DestinationBuilder);
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  describe('equipment', () => {
    let equipment: Equipment;

    beforeEach(() => {
      equipment = Factory.build('Equipment');
    });

    it('should be a function', () => {
      expect(typeof builder.equipment).toBe('function');
    });

    it('should convert Equipment to Destination', () => {
      expect(builder.equipment(equipment)).toEqual({
        description: `#${equipment.ref}`,
        entity: { id: equipment.id, type: DestinationType.Equipment },
        id: `${DestinationType.Equipment}-${equipment.id}`,
        parent: { id: undefined, type: undefined },
        title: equipment.title,
        unassignable: equipment.type === EquipmentType.Supply
      });
    });
  });

  describe('location', () => {
    let location: Location;

    beforeEach(() => {
      location = Factory.build('Location');
    });

    it('should be a function', () => {
      expect(typeof builder.location).toBe('function');
    });

    it('should convert Location to Destination', () => {
      expect(builder.location(location)).toEqual({
        description: location.bundle,
        entity: { id: location.id, type: DestinationType.Location },
        id: `${DestinationType.Location}-${location.id}`,
        parent: { id: undefined, type: undefined },
        title: location.title,
        unassignable: false
      });
    });
  });

  describe('member', () => {
    let member: Member;

    beforeEach(() => {
      member = Factory.build('Member');
    });

    it('should be a function', () => {
      expect(typeof builder.member).toBe('function');
    });

    it('should convert Member to Destination', () => {
      expect(builder.member(member)).toEqual({
        description: member.position,
        entity: { id: member.id, type: DestinationType.Member },
        id: `${DestinationType.Member}-${member.id}`,
        parent: { id: undefined, type: undefined },
        title: member.name,
        unassignable: false
      });
    });
  });
});
