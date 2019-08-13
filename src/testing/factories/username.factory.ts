import deepmerge from 'deepmerge';
import faker from 'faker';

import { Language } from './language.factory';
import { Username } from '../../lib/models';

export function Username(attributes: Partial<Username> = {}): Username {
  return deepmerge<Username>({
    exists: true,
    language: Language(),
    username: faker.internet.userName()
  }, attributes);
}
