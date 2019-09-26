import deepmerge from 'deepmerge';
import faker from 'faker';

import { Password } from '../../lib/models';

export function Password(attributes: Partial<Password> = {}): Password {
  return deepmerge<Password>({
    password: faker.internet.password(),
    rejected: false
  }, attributes);
}
