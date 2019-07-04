import faker from 'faker';
import deepmerge from 'deepmerge';

import { Language } from 'bindings/lib/models';
import { sequence } from './sequence';

export function Language(attributes: Partial<Language> = {}): Language {
  return deepmerge<Language>({
    id: 'en',
    locale: undefined,
    name: 'English'
  }, attributes);
}
