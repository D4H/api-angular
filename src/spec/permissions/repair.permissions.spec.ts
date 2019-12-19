import { Factory } from '@d4h/testing';

import { Member, Permission, Repair } from '../../lib/models';
import { Operation } from '../../lib/providers';
import { repairs } from '../../lib/permissions/repair.permissions';

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
    expect(repairs.length).toBe(1);
  });

  describe('Operation.Read', () => {
    it('should be false without a member', () => {
      expect(repairs(null)).toBe(false);
      expect(repairs(null, Operation.Read, null)).toBe(false);
    });

    it('should always be true', () => {
      expect(repairs(member)).toBe(true);
      expect(repairs(member, Operation.Read, null)).toBe(true);
      expect(repairs(member, Operation.Read, repair)).toBe(true);
    });
  });

  describe('Operation.Create', () => {
    it('should always be false', () => {
      expect(repairs(member, Operation.Create, null)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(repairs(member, Operation.Create, null)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(member, Operation.Create, null)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(repairs(member, Operation.Create, null)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(repairs(member, Operation.Create, null)).toBe(true);
    });
  });

  describe('Operation.Update', () => {
    it('should always be false', () => {
      expect(repairs(member, Operation.Update, repair)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(repairs(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(repairs(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(repairs(member, Operation.Update)).toBe(true);
    });

    it('should be false for repair.added_by.id === member.id without a repair', () => {
      repair.added_by.id = member.id;
      expect(repairs(member, Operation.Update)).toBe(false);
    });

    it('should be true for repair.added_by.id === member.id with a repair', () => {
      repair.added_by.id = member.id;
      expect(repairs(member, Operation.Update, repair)).toBe(true);
    });

    it('should be false for repair.assigned_to.id === member.id without a repair', () => {
      repair.assigned_to.id = member.id;
      expect(repairs(member, Operation.Update)).toBe(false);
    });

    it('should be true for repair.assigned_to.id === member.id with a repair', () => {
      repair.assigned_to.id = member.id;
      expect(repairs(member, Operation.Update, repair)).toBe(true);
    });
  });

  describe('Operation.Destroy', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(repairs(null, Operation.Destroy)).toBe(false);
      expect(repairs(member, Operation.Destroy, null)).toBe(false);
      expect(repairs(member, Operation.Destroy, repair)).toBe(false);
    });
  });
});
