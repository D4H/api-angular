import deepmerge from 'deepmerge';
import faker from 'faker';

import { Brand } from './brand.factory';
import { Model } from '../../lib/models';
import { sequence } from './sequence';

export function Model(attributes: Partial<Model> = {}): Model {
  const count = faker.random.number();
  const id = sequence('model.id');
  // tslint:disable-next-line variable-name
  const organisation_id = sequence('model.organisation_id');
  const weight = faker.random.number();
  const brand = Brand({ organisation_id, team_id: null });

  return deepmerge<Model>({
    id,
    count,
    count_inservice: 0,
    count_outservice: 0,
    organisation_id,
    quantity: faker.random.number({ min: 9, max: 15 }),
    team_id: null,
    title: faker.commerce.productName(),
    total_value: faker.random.number(),
    total_weight: count * weight,
    weight
  }, attributes);
}
