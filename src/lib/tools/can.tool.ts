import { Inject, Injectable } from '@angular/core';

import { CLIENT_PERMISSIONS, Operation, Permissions } from '../providers/permissions.provider';
import { ClientPermissionsModule } from '../client-permissions.module';
import { Member } from '../models';

export class UnknownPermissionError extends Error {
  constructor(type: string) {
    super(`Unknown permission ${type}`);
  }
}

/**
 * Assert Permissions Against Object Type: Can User Do X?
 * =============================================================================
 * This checks permissions for a given user, against a given permission
 * function. Generally speaking, in the D4H API all users can read all records,
 * although exceptions exist. All checks defer to a Permissions-typed function
 * which should be injected under the CLIENT_PERMISSIONS multi token.
 *
 * @example
 *
 *  this.can.action('inspections', member, Operation.Update, inspection)
 *  this.can.action('repairs', member, Operation.Create)
 *  this.can.read('repairs', member)
 *  this.can.destroy('inspections', member, inspection)
 */

@Injectable({ providedIn: ClientPermissionsModule })
export class Can {
  readonly permissions: Permissions;

  constructor(
    @Inject(CLIENT_PERMISSIONS) private readonly provided: Array<Permissions>
  ) {
    this.permissions = provided.reduce((acc, val) => ({ ...acc, ...val }), {});
  }

  action<T>(
    member: Member,
    type: string,
    operation: Operation = Operation.Read,
    record?: T
  ): boolean {
    if (typeof this.permissions[type] === 'function') {
      return this.permissions[type](member, operation, record);
    } else {
      throw new UnknownPermissionError(type);
    }
  }

  create(member: Member, type: string): boolean {
    return this.action(member, type, Operation.Create);
  }

  read<T>(member: Member, type: string, record?: T): boolean {
    return this.action(member, type, Operation.Read, record);
  }

  update<T>(member: Member, type: string, record?: T): boolean {
    return this.action(member, type, Operation.Update, record);
  }

  destroy<T>(member: Member, type: string, record?: T): boolean {
    return this.action(member, type, Operation.Destroy, record);
  }
}
