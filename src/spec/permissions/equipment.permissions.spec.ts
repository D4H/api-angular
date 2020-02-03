import { Factory } from '@d4h/testing';

import { Member, Permission, Equipment } from '../../lib/models';
import { Operation } from '../../lib/providers';
import { equipment } from '../../lib/permissions/equipment.permissions';

describe('Equipment Permissions', () => {
  let gear: Equipment;
  let member;

  beforeEach(() => {
    member = {
      id: 15,

      permission: {
        gear: false,
        gear_basic: false,
        name: Permission.None
      }
    } as Member;

    gear = Factory.build('Equipment');
  });

  it('should be a function', () => {
    expect(typeof equipment).toBe('function');
    expect(equipment.length).toBe(1);
  });

  describe('Operation.Create', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(equipment(undefined, Operation.Create)).toBe(false);
      expect(equipment(member, Operation.Create, undefined)).toBe(false);
      expect(equipment(member, Operation.Create, gear)).toBe(false);
    });
  });

  describe('Operation.Read', () => {
    it('should be false without a member', () => {
      expect(equipment(undefined)).toBe(false);
      expect(equipment(undefined, Operation.Read, undefined)).toBe(false);
    });

    it('should always be true', () => {
      expect(equipment(member)).toBe(true);
      expect(equipment(member, Operation.Read, undefined)).toBe(true);
      expect(equipment(member, Operation.Read, gear)).toBe(true);
    });
  });

  describe('Operation.Update', () => {
    it('should always be false', () => {
      expect(equipment(member, Operation.Update, gear)).toBe(false);
    });

    it('should be true for equipment.pending === undefined', () => {
      member.permission.name = Permission.Owner;
      gear.pending = undefined;
      expect(equipment(member, Operation.Update, gear)).toBe(true);
    });

    it('should be false for equipment.pending === object', () => {
      member.permission.name = Permission.Owner;
      gear.pending = { team_id: 1, location_id: 1 };
      expect(equipment(member, Operation.Update, gear)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(equipment(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(equipment(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(equipment(member, Operation.Update)).toBe(true);
    });
  });

  describe('Operation.Destroy', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(equipment(undefined, Operation.Destroy)).toBe(false);
      expect(equipment(member, Operation.Destroy, undefined)).toBe(false);
      expect(equipment(member, Operation.Destroy, gear)).toBe(false);
    });
  });
});
