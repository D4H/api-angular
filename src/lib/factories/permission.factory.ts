import deepmerge from 'deepmerge';

import { MemberPermissions, Permission } from '../../lib/models';
import { sequence } from '../tools';

export function MemberPermission(attributes: Partial<MemberPermissions> = {}): MemberPermissions {
  return deepmerge<MemberPermissions>({
    documents: false,
    events: false,
    exercises: false,
    gear: false,
    gear_basic: false,
    healthsafety: false,
    id: sequence('permission.id'),
    incidents: false,
    name: Permission.None,
    sms: false
  }, attributes);
}
