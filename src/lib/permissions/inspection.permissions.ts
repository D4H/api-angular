import { Inspection, Member, Permission } from '../models';
import { Operation } from '../providers';

/**
 * Inspection Operation Permissions
 * =============================================================================
 * Operation.Read:
 *
 *  - Anyone, no check required.
 *
 * Operation.Update:
 *
 *  - permission.name === Permission.Editor
 *  - permission.name === Permission.Owner
 *  - permission.gear === true
 *  - permission.gear_basic === true
 *  - inspection.member_id === member.id
 */

export function inspections(
  member: Member,
  operation: Operation = Operation.Read,
  inspection?: Inspection
): boolean {
  switch (operation) {
    case Operation.Read: {
      return Boolean(member);
    }

    case Operation.Update: {
      return (
        [Permission.Editor, Permission.Owner].includes(member.permission.name)
        || member.permission.gear
        || member.permission.gear_basic
        || Boolean(inspection) && inspection.member_id === member.id
      );
    }

    default: {
      return false;
    }
  }
}
