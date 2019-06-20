import faker from 'faker';
import deepmerge from 'deepmerge';

import { ClientConfig, Region, Version } from '../../lib/providers';
import { sample } from '../utilities';

export function ClientConfig(attributes: Partial<ClientConfig> = {}): ClientConfig {
  return deepmerge<ClientConfig>({
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
