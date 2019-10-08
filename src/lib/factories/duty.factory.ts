import deepmerge from 'deepmerge';
import faker from 'faker';

import { Duty, DutyRepeatInterval, DutyType, Role } from '../../lib/models';
import { Period } from './period.factory';
import { sample, sequence } from '../tools';

/**
 * Duty Factory
 * =============================================================================
 * Only on-call duty records can have a role, but not every on-call duty period
 * has a role.
 */

export function Duty(attributes: Partial<Duty> = {}): Duty {
  const type: DutyType = sample<DutyType>(DutyType);
  const { date, enddate } = Period();

  let role: { id: number, title: string } = {
    id: undefined,
    title: undefined
  };

  if (type && faker.random.number() % 2 === 0) {
    role = {
      id: sequence('duty.role.id'),
      title: faker.name.jobTitle()
    };
  }

  return deepmerge<Duty>({
    date,
    enddate,
    id: sequence('duty.id'),
    member_id: sequence('duty.member_id'),
    notes: faker.lorem.paragraph(),
    parent_id: null,
    repeat_every: sample<DutyRepeatInterval>(DutyRepeatInterval),
    repeat_until: enddate,
    role,
    team_id: sequence('duty.team_id'),
    type
  }, attributes);
}
