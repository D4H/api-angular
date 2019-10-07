import { Factory } from '../../testing';
import { Inspection, Member, Permission } from '../../lib/models';
import { Operation, Permissions } from '../../lib/permissions';

const { inspections } = Permissions;

describe('Inspection Permissions', () => {
  let inspection: Inspection;
  let member: Member;

  beforeEach(() => {
    member = {
      id: 15,

      permission: {
        gear: false,
        gear_basic: false,
        name: Permission.None
      }
    } as Member;

    inspection = Factory.build('Inspection');
  });

  it('should be a function', () => {
    expect(typeof inspections).toBe('function');
    expect(inspections.length).toBe(2);
  });

  describe('Operation.Create', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(null, null, Operation.Create)).toBe(false);
      expect(inspections(member, null, Operation.Create)).toBe(false);
      expect(inspections(member, inspection, Operation.Create)).toBe(false);
    });
  });

  describe('Operation.Read', () => {
    it('should be false without a member', () => {
      expect(inspections(null, null)).toBe(false);
      expect(inspections(null, null, Operation.Read)).toBe(false);
    });

    it('should always be true', () => {
      expect(inspections(member, null)).toBe(true);
      expect(inspections(member, null, Operation.Read)).toBe(true);
      expect(inspections(member, inspection)).toBe(true);
      expect(inspections(member, inspection, Operation.Read)).toBe(true);
    });
  });

  describe('Operation.Update', () => {
    it('should always be false', () => {
      expect(inspections(member, inspection, Operation.Update)).toBe(false);
    });

    it('should be false without a inspection', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(member, null, Operation.Update)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(inspections(member, inspection, Operation.Update)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(member, inspection, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(inspections(member, inspection, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(inspections(member, inspection, Operation.Update)).toBe(true);
    });

    it('should be true for inspection.member_id === member.id', () => {
      inspection.member_id = member.id;
      expect(inspections(member, inspection, Operation.Update)).toBe(true);
    });
  });

  describe('Operation.Destroy', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(null, null, Operation.Destroy)).toBe(false);
      expect(inspections(member, null, Operation.Destroy)).toBe(false);
      expect(inspections(member, inspection, Operation.Destroy)).toBe(false);
    });
  });
});
