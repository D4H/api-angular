import { Member, Permission, Equipment } from '../models';
import { Operation } from '../providers';

/**
 * Equipment Operation Permissions
 * =============================================================================
 * Operation.Read:
 *
 *  - Anyone can read, no further check required.
 *
 * Opperation.Update:
 *
 * All equipment update operations will fail if the equipment is pending
 * transfer to another team, repesented as equipment.pending. This object
 * attribute is only present on such equipment.
 *
 *  - equipment.pending === false OR:
 *  - permission.name === Permission.Editor
 *  - permission.name === Permission.Owner
 *  - permission.gear === true
 *
 * @see https://github.com/D4H/decisions-project/issues/3905
 */

export function equipment(
  member: Member,
  operation: Operation = Operation.Read,
  gear?: Equipment
): boolean {
  switch (operation) {
    case Operation.Read: {
      return Boolean(member);
    }

    case Operation.Update: {
      if (gear && gear.pending) {
        return false;
      } else {
        return (
          [Permission.Editor, Permission.Owner].includes(member.permission.name)
          || member.permission.gear
        );
      }
    }

    default: {
      return false;
    }
  }
}
