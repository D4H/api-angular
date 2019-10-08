import { Factory } from '../../lib/factories';
import { Inspection, Member, Permission } from '../../lib/models';
import { Operation } from '../../lib/providers';
import { inspections } from '../../lib/permissions/inspection.permissions';

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
    expect(inspections.length).toBe(1);
  });

  describe('Operation.Create', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(null, Operation.Create)).toBe(false);
      expect(inspections(member, Operation.Create, null)).toBe(false);
      expect(inspections(member, Operation.Create, inspection)).toBe(false);
    });
  });

  describe('Operation.Read', () => {
    it('should be false without a member', () => {
      expect(inspections(null)).toBe(false);
      expect(inspections(null, Operation.Read, null)).toBe(false);
    });

    it('should always be true', () => {
      expect(inspections(member)).toBe(true);
      expect(inspections(member, Operation.Read, null)).toBe(true);
      expect(inspections(member, Operation.Read, inspection)).toBe(true);
      expect(inspections(member, Operation.Read, inspection)).toBe(true);
    });
  });

  describe('Operation.Update', () => {
    it('should always be false', () => {
      expect(inspections(member, Operation.Update, inspection)).toBe(false);
    });

    it('should be false without a inspection', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(member, Operation.Update, null)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(inspections(member, Operation.Update, inspection)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(member, Operation.Update, inspection)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(inspections(member, Operation.Update, inspection)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(inspections(member, Operation.Update, inspection)).toBe(true);
    });

    it('should be true for inspection.member_id === member.id', () => {
      inspection.member_id = member.id;
      expect(inspections(member, Operation.Update, inspection)).toBe(true);
    });
  });

  describe('Operation.Destroy', () => {
    it('should always be false', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(null, Operation.Destroy)).toBe(false);
      expect(inspections(member, Operation.Destroy, null)).toBe(false);
      expect(inspections(member, Operation.Destroy, inspection)).toBe(false);
    });
  });
});
