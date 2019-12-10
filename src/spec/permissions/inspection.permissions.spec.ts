import { Factory } from '@d4h/testing';

import { Inspection, Member, Permission } from '../../lib/models';
import { Operation } from '../../lib/providers';
import { inspections } from '../../lib/permissions/inspection.permissions';

describe('Inspection Permissions', () => {
  let inspection: Inspection;
  let member: Member;

  /**
   * Create member with no relevant permissions and member.id different to
   * inspecton.member_id, in order to avoid collisions/false positives in
   * update permisson checks.
   */

  beforeEach(() => {
    member = Factory.build('Member', {
      id: 7,

      permission: {
        gear: false,
        gear_basic: false,
        name: Permission.None
      }
    });

    inspection = Factory.build('Inspection', {
      member_id: 15
    });
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
    });
  });

  describe('Operation.Update', () => {
    it('should always be false for member without gear permissions', () => {
      expect(inspections(member, Operation.Update, inspection)).toBe(false);
    });

    it('should be true for permission.name === Permission.Owner', () => {
      member.permission.name = Permission.Owner;
      expect(inspections(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.name === Permission.Editor', () => {
      member.permission.name = Permission.Editor;
      expect(inspections(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear === true', () => {
      member.permission.gear = true;
      expect(inspections(member, Operation.Update)).toBe(true);
    });

    it('should be true for permission.gear_basic === true', () => {
      member.permission.gear_basic = true;
      expect(inspections(member, Operation.Update)).toBe(true);
    });

    it('should be false for repair.member_id === member.id without a repair', () => {
      inspection.member_id = member.id;
      expect(inspections(member, Operation.Update)).toBe(false);
    });

    it('should be true for inspection.member_id === member.id with a repair', () => {
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
