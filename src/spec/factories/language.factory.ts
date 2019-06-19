import * as faker from 'faker';
import * as merge from 'deepmerge';

import { Language } from '../../lib/models';
import { sequence } from './sequence';

export function Language(attributes: Partial<Language> = {}): Language {
  return merge<Language>({
    id: 'en',
    locale: undefined,
    name: 'English'
  }, attributes);
}
