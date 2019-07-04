import faker from 'faker';
import deepmerge from 'deepmerge';

import { MemberPermission, PermissionType } from 'bindings/lib/models';
import { sample } from '../tools';
import { sequence } from './sequence';

export function MemberPermission(attributes: Partial<MemberPermission> = {}): MemberPermission {
  return deepmerge<MemberPermission>({
    documents: faker.random.boolean(),
    events: faker.random.boolean(),
    exercises: faker.random.boolean(),
    gear: faker.random.boolean(),
    gear_basic: faker.random.boolean(),
    healthsafety: faker.random.boolean(),
    id: sequence('permission.id'),
    incidents: faker.random.boolean(),
    name: sample(PermissionType),
    sms: faker.random.boolean()
  }, attributes);
}
