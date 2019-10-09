import deepmerge from 'deepmerge';
import faker from 'faker';

import { Note } from '../../lib/models';
import { Period } from './period.factory';
import { sequence } from '../tools';

export function Note(attributes: Partial<Note> = {}): Note {
  const { date, enddate } = Period();

  return deepmerge<Note>({
    date,
    enddate,
    from_member_id: sequence('note.from_member_id'),
    from_member_name: faker.name.findName(),
    message: faker.lorem.paragraph(),
    id: sequence('note.id'),
    team_id: sequence('note.team_id'),
    urgent: false
  }, attributes);
}
