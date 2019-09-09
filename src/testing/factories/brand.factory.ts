import deepmerge from 'deepmerge';
import faker from 'faker';

import { Brand } from '../../lib/models';
import { sequence } from './sequence';

export function Brand(attributes: Partial<Brand> = {}): Brand {
  return deepmerge<Brand>({
    id: sequence('brand.id'),
    count: faker.random.number({ min: 9, max: 15 }),
    count_inactive: 0,
    count_inservice: 0,
    count_lost: 0,
    count_outservice: 0,
    organisation_id: null,
    quantity: faker.random.number({ min: 9, max: 15 }),
    team_id: sequence('brand.team_id'),
    title: faker.commerce.productName(),
    total_value: faker.random.number(),
    total_weight: 0
  }, attributes);
}
