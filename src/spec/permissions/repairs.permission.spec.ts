import { Factory } from '../../testing';
import { Member, Permission, Repair } from '../../lib/models';
import { Operation, Permissions } from '../../lib/permissions';

const { repairs } = Permissions;

describe('Repair Permissions', () => {
  let member;
  let repair: Repair;

  beforeEach(() => {
    member = {
      id: 15,

      permission: {
        gear: false,
        gear_basic: false,
        name: Permission.None
      }
    } as Member;

    repair = Factory.build('Repair');
  });

  it('should be a function', () => {
    expect(typeof repairs).toBe('function');
    expect(repairs.length).toBe(2);
  });

  describe('Operation.Read', () => {
    it('should be false without a member', () => {
      expect(repairs(null, null)).toBe(false);
      expect(repairs(null, null, Operation.Read)).toBe(false);
    });

    it('should always be true', () => {
      expect(repairs(member, null)).toBe(true);
      expect(repairs(member, null, Operation.Read)).toBe(true);
      expect(repairs(member, repair)).toBe(true);
      expect(repairs(member, repair, Operation.Read)).toBe(true);
    });
  });

  describe('Operation.Create', () => {
    it('should always be false', () => {
      expect(repairs(member, null, Operation.Create)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(repairs(member, null, Operation.Create)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(member, null, Operation.Create)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(repairs(member, null, Operation.Create)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(repairs(member, null, Operation.Create)).toBe(true);
    });
  });

  describe('Operation.Update', () => {
    it('should always be false', () => {
      expect(repairs(member, repair, Operation.Update)).toBe(false);
    });

    it('should be false without a repair', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(member, null, Operation.Update)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(repairs(member, repair, Operation.Update)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(member, repair, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(repairs(member, repair, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(repairs(member, repair, Operation.Update)).toBe(true);
    });

    it('should be true for repair.added_by.id === member.id', () => {
      repair.added_by.id = member.id;
      expect(repairs(member, repair, Operation.Update)).toBe(true);
    });

    it('should be true for repair.assigned_to.id === member.id', () => {
      repair.assigned_to.id = member.id;
      expect(repairs(member, repair, Operation.Update)).toBe(true);
    });
  });

  describe('Operation.Destroy', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(null, null, Operation.Destroy)).toBe(false);
      expect(repairs(member, null, Operation.Destroy)).toBe(false);
      expect(repairs(member, repair, Operation.Destroy)).toBe(false);
    });
  });
});
