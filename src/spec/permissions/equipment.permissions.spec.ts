import { Factory } from '../../lib/factories';
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
      expect(equipment(null, Operation.Create)).toBe(false);
      expect(equipment(member, Operation.Create, null)).toBe(false);
      expect(equipment(member, Operation.Create, gear)).toBe(false);
    });
  });

  describe('Operation.Read', () => {
    it('should be false without a member', () => {
      expect(equipment(null)).toBe(false);
      expect(equipment(null, Operation.Read, null)).toBe(false);
    });

    it('should always be true', () => {
      expect(equipment(member)).toBe(true);
      expect(equipment(member, Operation.Read, null)).toBe(true);
      expect(equipment(member, Operation.Read, gear)).toBe(true);
    });
  });

  describe('Operation.Update', () => {
    it('should always be false', () => {
      expect(equipment(member, Operation.Update, gear)).toBe(false);
    });

    it('should be true for equipment.pending === null', () => {
      member.permission.name = Permission.Owner;
      gear.pending = null;
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
      expect(equipment(null, Operation.Destroy)).toBe(false);
      expect(equipment(member, Operation.Destroy, null)).toBe(false);
      expect(equipment(member, Operation.Destroy, gear)).toBe(false);
    });
  });
});
