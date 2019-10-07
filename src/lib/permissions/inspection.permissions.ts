import { Inspection, Member, Permission } from '../models';
import { Operation } from './operations';

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
  inspection?: Inspection,
  operation: Operation = Operation.Read
): boolean {
  switch (operation) {
    case Operation.Read:
      return Boolean(member);
    case Operation.Update:
      return Boolean(inspection) && (
        [Permission.Editor, Permission.Owner].includes(member.permission.name)
        || member.permission.gear
        || member.permission.gear_basic
        || inspection.member_id === member.id
      );
    default:
      return false;
  }
}
