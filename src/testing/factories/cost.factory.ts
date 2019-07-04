import faker from 'faker';
import deepmerge from 'deepmerge';

import { Cost, Currency } from 'bindings/lib/models';

export function Cost(attributes: Partial<Cost> = {}): Cost {
  return deepmerge<Cost>({
    currency: faker.finance.currencySymbol() as Currency,
    value: faker.random.number()
  }, attributes);
}
