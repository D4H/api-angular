import faker from 'faker';
import deepmerge from 'deepmerge';

import { Password } from '../../lib/models';

export function Password(attributes: Partial<Password> = {}): Password {
  return deepmerge<Password>({
    password: faker.internet.password(),
    rejected: false
  }, attributes);
}
