import faker from 'faker';
import deepmerge from 'deepmerge';

import { Repair, RepairInterval } from '../../lib/models';
import { sample } from '../tools';
import { sequence } from './sequence';

export function Repair(attributes: Partial<Repair> = {}): Repair {
  return deepmerge<Repair>({
    active: faker.random.boolean(),
    all_kinds: faker.random.boolean(),
    bundle: 'foo',
    date_due: faker.date.future().toISOString(),
    gear_parent_id: sequence('repair.gear_parent_id'),
    id: sequence('repair.id'),
    interval_unit: sample.enumerable(RepairInterval),
    interval_value: faker.random.number(),
    is_auto_unserviceable: faker.random.boolean(),
    items_count: faker.random.number(),
    items_due_count: faker.random.number(),
    location_id: sequence('repair.location_id'),
    member_id: sequence('repair.member_id'),
    remainder_unit: sample.enumerable(RepairInterval),
    remainder_value: faker.random.number(),
    title: faker.commerce.productName()
  }, attributes);
}
