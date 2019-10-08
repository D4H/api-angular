import deepmerge from 'deepmerge';
import faker from 'faker';

import { Account } from '../../lib/models';
import { Language } from './language.factory';
import { sequence } from '../tools';

export function Account(attributes: Partial<Account> = {}): Account {
  const createdDate: string = faker.date.past().toISOString();
  const username: string = faker.internet.userName();

  return deepmerge<Account>({
    created: createdDate,
    expires_on: null,
    token: faker.random.uuid(),
    token_id: sequence('account.token_id'),
    type: 'account',

    account: {
      created: createdDate,
      id: sequence('account.account.id'),
      language: Language(),
      lastlogin: faker.date.past().toISOString(),
      primary_email: `${username}@example.com`,
      username
    },

    scope: {
      profile: 'client',
      source: 'external'
    }
  }, attributes);
}
