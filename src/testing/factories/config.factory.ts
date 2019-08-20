import faker from 'faker';
import deepmerge from 'deepmerge';

import { Config, Region, Version } from '../../lib/providers';
import { sample } from '../tools';

export function Config(attributes: Partial<Config> = {}): Config {
  return deepmerge<Config>({
    region: sample.enumerable<Region>(Region),
    version: sample.enumerable<Version>(Version),

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
