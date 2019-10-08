import { InjectionToken } from '@angular/core';
import { Member } from '../models';

/**
 * Client Permissions Provider
 * =============================================================================
 * Member permissions are asserted against CRUD operations. By default every
 * member may read all records, though what fields are returned vary can vary by
 * member permission. For example, only a member >= editor can see the emergency
 * contacts of other team members.
 */

export interface Permissions {
  [key: string]: (member: Member, operation: Operation, record: any) => boolean;
}

export enum Operation {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Destroy = 'destroy'
}

export const CLIENT_PERMISSIONS = new InjectionToken<Permissions>(
  'CLIENT_PERMISSIONS'
);
