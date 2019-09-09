import deepmerge from 'deepmerge';
import faker from 'faker';

import { Category } from '../../lib/models';
import { sequence } from './sequence';

export function Category(attributes: Partial<Category> = {}): Category {
  return deepmerge<Category>({
    count: faker.random.number({ min: 9, max: 15 }),
    count_inactive: 0,
    count_inservice: 0,
    count_lost: 0,
    count_outservice: 0,
    id: sequence('category.id'),
    organisation_id: sequence('category.organisation_id'),
    quantity: faker.random.number({ min: 9, max: 15 }),
    team_id: null,
    title: faker.commerce.productName(),
    total_value: faker.random.number(),
    total_weight: 0
  }, attributes);
}
