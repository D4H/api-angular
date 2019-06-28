import faker from 'faker';
import deepmerge from 'deepmerge';

import { Location } from '../../lib/models';
import { sequence } from './sequence';

export function Location(attributes: Partial<Location> = {}): Location {
  return deepmerge<Location>({
    bundle: faker.internet.domainWord(),
    count: faker.random.number({ min: 7, max: 15 }),
    created: faker.date.past(),
    id: sequence('location.id'),
    title: faker.address.city(),
    unit_id: sequence('location.team_id'),
    unit_title: faker.company.companyName(),
    updated: faker.date.past()
  }, attributes);
}
