import deepmerge from 'deepmerge';
import faker from 'faker';

import { ResultStatus, Result } from '../../lib/models';
import { sample, sequence } from '../tools';

export function Result(attributes: Partial<Result> = {}): Result {
  return deepmerge<Result>({
    completed: faker.random.boolean(),
    date_completed: faker.date.past().toISOString(),
    date_due: faker.date.future().toISOString(),
    description: faker.lorem.paragraph(),
    equipment_id: sequence('inspection_item.equipment_id'),
    id: sequence('inspection_item.id'),
    last_modified: faker.date.past().toISOString(),
    member_id: sequence('inspection_item.member_id'),
    repair_id: sequence('inspection_item.repair_id'),
    status: sample<ResultStatus>(ResultStatus),
    team_id: sequence('inspection_item.team_id'),
    title: faker.lorem.sentence()
  }, attributes);
}
