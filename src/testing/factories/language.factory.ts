import deepmerge from 'deepmerge';
import faker from 'faker';

import { Language } from '../../lib/models';

export function Language(attributes: Partial<Language> = {}): Language {
  return deepmerge<Language>({
    id: 'en',
    locale: undefined,
    name: 'English'
  }, attributes);
}
