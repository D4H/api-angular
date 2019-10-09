import { Member, Permission, Repair } from '../models';
import { Operation } from '../providers';

/**
 * Repair Operation Permissions
 * =============================================================================
 * Operation.Read:
 *
 *  - Anyone can read, no further check required.
 *
 * Operation.Create:
 *
 *  - permission.name === Permission.Editor
 *  - permission.name === Permission.Owner
 *  - permission.gear === true
 *  - permission.gear_basic === true
 *
 * Opperation.Update:
 *
 *  - permission.name === Permission.Editor
 *  - permission.name === Permission.Owner
 *  - permission.gear === true
 *  - repair.added_by.id === member.id
 *  - repair.assigned_to.id === member.id
 *
 * TODO: Repair items whose entity is pending transfer cannot be updated (will
 * always return false).
 *
 * @see https://github.com/D4H/decisions-project/issues/3905
 */

export function repairs(
  member: Member,
  operation: Operation = Operation.Read,
  repair?: Repair
): boolean {
  switch (operation) {
    case Operation.Read: {
      return Boolean(member);
    }

    case Operation.Create: {
      return (
        [Permission.Editor, Permission.Owner].includes(member.permission.name)
        || member.permission.gear
        || member.permission.gear_basic
      );
    }

    case Operation.Update: {
      return (
        [Permission.Editor, Permission.Owner].includes(member.permission.name)
        || member.permission.gear
        || member.permission.gear_basic
        || Boolean(repair) && repair.added_by.id === member.id
        || Boolean(repair) && repair.assigned_to.id === member.id
      );
    }

    default: {
      return false;
    }
  }
}
