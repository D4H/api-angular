import deepmerge from 'deepmerge';
import faker from 'faker';

import { CurrencyCost } from './cost.factory';
import {  Role } from '../../lib/models';
import { sequence } from '../tools';

export function Role(attributes: Partial<Role> = {}): Role {
  return deepmerge<Role>({
    bundle: faker.name.jobType(),
    cost_per_hour: CurrencyCost(),
    cost_per_use: CurrencyCost(),
    id: sequence('role.id'),
    organisation_id: null,
    title: faker.name.jobTitle(),
    unit_id: sequence('role.team_id')
  }, attributes);
}
