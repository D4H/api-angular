import faker from 'faker';
import deepmerge from 'deepmerge';

import { Currency, Role } from '../../lib/models';
import { sequence } from './sequence';

export function Role(attributes: Partial<Role> = {}): Role {
  return deepmerge<Role>({
    bundle: faker.name.jobType(),
    id: sequence('role.id'),
    organisation_id: sequence('role.organisation_id'),
    unit_id: sequence('role.team_id'),
    title: faker.name.jobTitle(),

    cost_per_hour: {
     currency: faker.finance.currencySymbol() as Currency,
      value: faker.random.number()
    },

    cost_per_use: {
     currency: faker.finance.currencySymbol() as Currency,
      value: faker.random.number()
    }
  }, attributes);
}
