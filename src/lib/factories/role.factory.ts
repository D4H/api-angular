import deepmerge from 'deepmerge';
import faker from 'faker';

import { Currency, Role } from '../../lib/models';
import { sequence } from '../tools';

const cost = ({
  currency = faker.finance.currencySymbol() as Currency,
  value = faker.random.number()
} = {}) => ({ currency, value });

export function Role(attributes: Partial<Role> = {}): Role {
  return deepmerge<Role>({
    bundle: faker.name.jobType(),
    cost_per_hour: cost(),
    cost_per_use: cost(),
    id: sequence('role.id'),
    organisation_id: null,
    title: faker.name.jobTitle(),
    unit_id: sequence('role.team_id')
  }, attributes);
}
