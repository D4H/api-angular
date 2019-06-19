import * as faker from 'faker';
import * as merge from 'deepmerge';

import { Username } from '../../lib/models';

export function Username(attributes: Partial<Username> = {}): Username {
  return merge<Username>({
    exists: true,
    language: 'en',
    username: faker.internet.userName()
  }, attributes);
}
