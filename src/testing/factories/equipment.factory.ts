import faker from 'faker';
import deepmerge from 'deepmerge';

import { Cost } from './cost.factory';
import { Equipment, EquipmentStatus, EquipmentType } from 'bindings/lib/models';
import { Location } from './location.factory';
import { sample } from '../tools';
import { sequence } from './sequence';

export function Equipment(attributes: Partial<Equipment> = {}): Equipment {
  const location = Location();

  return deepmerge<Equipment>({
    barcode: faker.random.uuid(),
    cost_per_distance: Cost(),
    cost_per_hour: Cost(),
    cost_per_use: Cost(),
    // custom_fields?: Array<any>;
    // date_expires: Date;
    date_firstuse: faker.date.past(),
    date_last_moved: faker.date.past(),
    // date_last_status_change: Date;
    date_manufactured: faker.date.past(),
    date_purchased: faker.date.past(),
    // date_retired: Date;
    // date_warranty: Date;
    id: sequence('equipment.id'),
    // is_all_child_op: boolean;
    is_critical: faker.random.boolean(),
    is_monitor: faker.random.boolean(),
    // minutes_use: number;
    notes: faker.lorem.paragraph(),
    // odometer_reading: number;
    // odometer_reading_date: Date;
    // odometer_reading_total: number;
    // odometer_reading_total_allowed: number;
    quantity: faker.random.number({ min: 9, max: 15 }),
    // ref: string;
    // serial: string;
    team_id: sequence('equipment.team_id'),
    title: faker.commerce.productName(),
    total_replacement_cost: Cost(),
    // total_weight: Weight;
    type: sample(EquipmentType),
    // urls?: object;
    //
    // brand: {
    //   id: number;
    //   title: number;
    // };
    //
    // category: {
    //   id: number;
    //   title: number;
    // };
    //
    // kind: {
    //   id: number;
    //   title: string;
    // };

    location: {
      location_array: [location.title],
      location_id: location.id,
      location_title: location.title,
      member_id: sequence('equipment.location.member_id'),
      member_name: faker.name.findName(),
      parent_id: location.unit_id,
      unit_title: location.unit_title
    }

    // model: {
    //   id: number;
    //   title: string;
    // };
    //
    // status: {
    //   id: number;
    //   title: EquipmentStatus;
    // };
    //
    // supplier: {
    //   id: number;
    //   title: string;
    // };
    //
    // supplier_ref: {
    //   id: number;
    //   title: string;
    // };
  }, attributes);
}
