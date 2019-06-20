import faker from 'faker';
import deepmerge from 'deepmerge';

import { Group } from '../../lib/models';
import { sequence } from './sequence';

export function Group(attributes: Partial<Group> = {}): Group {
  return deepmerge<Group>({
    id: sequence('group.id'),
    organisation: sequence('group.organisation_id'),
    team_id: sequence('group.team_id'),
    title: faker.name.jobTitle()
  }, attributes);
}
