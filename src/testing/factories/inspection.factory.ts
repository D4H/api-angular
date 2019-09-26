import deepmerge from 'deepmerge';
import faker from 'faker';

import { Inspection, InspectionInterval } from '../../lib/models';
import { sample } from '../tools';
import { sequence } from './sequence';

export function Inspection(attributes: Partial<Inspection> = {}): Inspection {
  return deepmerge<Inspection>({
    active: faker.random.boolean(),
    all_kinds: faker.random.boolean(),
    bundle: faker.commerce.department(),
    date_due: faker.date.future().toISOString(),
    gear_parent_id: sequence('repair.gear_parent_id'),
    id: sequence('repair.id'),
    interval_unit: sample<InspectionInterval>(InspectionInterval),
    interval_value: faker.random.number(),
    is_auto_unserviceable: faker.random.boolean(),
    items_count: faker.random.number(),
    items_due_count: faker.random.number(),
    location_id: sequence('repair.location_id'),
    member_id: sequence('repair.member_id'),
    reminder_unit: sample<InspectionInterval>(InspectionInterval),
    reminder_value: faker.random.number(),
    title: faker.commerce.productName()
  }, attributes);
}
