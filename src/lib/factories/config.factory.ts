import deepmerge from 'deepmerge';
import faker from 'faker';

import { Config, Region, Version } from '../../lib/providers';
import { sample } from '../tools';

export function Config(attributes: Partial<Config> = {}): Config {
  return deepmerge<Config>({
    region: sample<Region>(Region),
    version: sample<Version>(Version),

    client: {
      name: faker.name.findName(),
      version: faker.fake('{{random.number}}.{{random.number}}.{{random.number}}')
    },

    tokens: {
      account: faker.random.uuid(),
      organisation: faker.random.uuid(),
      team: faker.random.uuid()
    }
  }, attributes);
}
