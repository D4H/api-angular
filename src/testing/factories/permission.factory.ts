import deepmerge from 'deepmerge';
import faker from 'faker';

import { MemberPermissions, Permission } from '../../lib/models';
import { sample } from '../tools';
import { sequence } from './sequence';

export function MemberPermission(attributes: Partial<MemberPermissions> = {}): MemberPermissions {
  return deepmerge<MemberPermissions>({
    documents: faker.random.boolean(),
    events: faker.random.boolean(),
    exercises: faker.random.boolean(),
    gear: faker.random.boolean(),
    gear_basic: faker.random.boolean(),
    healthsafety: faker.random.boolean(),
    id: sequence('permission.id'),
    incidents: faker.random.boolean(),
    name: sample<Permission>(Permission),
    sms: faker.random.boolean()
  }, attributes);
}
