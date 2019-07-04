import faker from 'faker';
import deepmerge from 'deepmerge';

import { Username } from 'bindings/lib/models';

export function Username(attributes: Partial<Username> = {}): Username {
  return deepmerge<Username>({
    exists: true,
    language: 'en',
    username: faker.internet.userName()
  }, attributes);
}
