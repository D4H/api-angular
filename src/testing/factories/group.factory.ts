import deepmerge from 'deepmerge';
import faker from 'faker';

import { Group } from '../../lib/models';
import { sequence } from './sequence';

export function Group(attributes: Partial<Group> = {}): Group {
  return deepmerge<Group>({
    id: sequence('group.id'),
    organisation: sequence('group.organisation_id'),
    team: null,
    title: faker.name.jobTitle()
  }, attributes);
}
