import * as faker from 'faker';
import * as merge from 'deepmerge';

import { Role } from '../../lib/models';
import { sequence } from './sequence';

export function Role(attributes: Partial<Role> = {}): Role {
  return merge<Role>({
    bundle: faker.name.jobType(),
    // cost_per_hour
    // cost_per_use
    id: sequence('role.id'),
    organisation_id: sequence('role.organisation_id'),
    team_id: sequence('role.team_id'),
    title: faker.name.jobTitle()
  }, attributes);
}
