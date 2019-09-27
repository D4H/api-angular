import deepmerge from 'deepmerge';
import faker from 'faker';

import { Equipment } from './equipment.factory';
import { Member } from './member.factory';
import { sample } from '../tools';
import { sequence } from './sequence';

import {
  Currency,
  MembershipType,
  Repair,
  RepairCause,
  RepairLocation,
  RepairStatus
} from '../../lib/models';


const cost = ({
  symbol = faker.finance.currencySymbol() as Currency,
  value = faker.random.number()
} = {}) => ({ symbol, value });

export function Repair(attributes: Partial<Repair> = {}): Repair {
  const activityId = sequence('repair.activity_id');
  const dueDate: Date = faker.date.between(faker.date.past(), faker.date.future());
  const equipment = Equipment();
  const member = Member();
  const type: MembershipType = sample<MembershipType>(MembershipType);

  return deepmerge<Repair>({
    date_completed: faker.date.past().toISOString(),
    date_created: faker.date.past().toISOString(),
    date_due: dueDate.toISOString(),
    description: faker.lorem.paragraph(),
    equipment_id: equipment.id,
    equipment_ref: equipment.ref,
    equipment_status: equipment.status.id,
    equipment_title: equipment.title,
    fund_id: sequence('repair.fund_id'),
    id: sequence('repair.id'),
    repair_activity_id: activityId,
    repair_cost: cost(),
    team_id: sequence('repair.team_id'),
    title: faker.lorem.sentence(),

    added_by: {
      id: member.id,
      name: member.name,
      type
    },

    assigned_to: {
      id: member.id,
      name: member.name,
      type
    },

    entity: {
      id: equipment.id,
      team_id: equipment.team_id,
      type: equipment.type
    },

    repair: {
      activity_id: activityId,
      cause: faker.lorem.word(),
      cost: faker.random.number()
    },

    repair_cause: {
      id: sample<RepairCause>(RepairCause),
      label: faker.lorem.word()
    },

    status: {
      id: sample<RepairStatus>(RepairStatus),
      label: faker.lorem.word()
    }
  }, attributes);
}
