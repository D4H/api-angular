import faker from 'faker';
import deepmerge from 'deepmerge';

import { Cost } from './cost.factory';
import { Equipment, EquipmentStatus, EquipmentType } from '../../lib/models';
import { Location } from './location.factory';
import { sample } from '../tools';
import { sequence } from './sequence';

export function Equipment(attributes: Partial<Equipment> = {}): Equipment {
  const critical = faker.random.boolean();
  const id = sequence('equipment.id');
  const location = Location();
  const monitor = faker.random.boolean();

  return deepmerge<Equipment>({
    barcode: faker.random.uuid(),
    cost_per_distance: Cost(),
    cost_per_hour: Cost(),
    cost_per_use: Cost(),
    critical_alert: critical,
    custom_fields: [],
    // date_expires: Date;
    date_firstuse: faker.date.past().toISOString(),
    date_last_moved: faker.date.past().toISOString(),
    // date_last_status_change: Date;
    date_manufactured: faker.date.past().toISOString(),
    date_purchased: faker.date.past().toISOString(),
    // date_retired: Date;
    // date_warranty: Date;
    expire_alert: monitor,
    id,
    // is_all_child_op: boolean;
    is_critical: critical,
    is_monitor: monitor,
    // minutes_use: number;
    notes: faker.lorem.paragraph(),
    // odometer_reading: number;
    // odometer_reading_date: Date;
    // odometer_reading_total: number;
    // odometer_reading_total_allowed: number;
    quantity: faker.random.number({ min: 9, max: 15 }),
    // ref: string;
    replacement_cost: Cost(),
    // serial: string;
    team_id: sequence('equipment.team_id'),
    title: faker.commerce.productName(),
    total_replacement_cost: Cost(),
    // total_weight: Weight;
    type: sample.enumerable(EquipmentType),

    brand: {
      id: sequence('equipment.brand.id'),
      title: faker.commerce.productName()
    },

    category: {
      id: sequence('equipment.category.id'),
      title: faker.commerce.productName()
    },

    kind: {
      id: sequence('equipment.kind.id'),
      title: faker.commerce.productName()
    },

    location: {
      location_array: [location.title],
      location_id: location.id,
      location_title: location.title,
      member_id: sequence('equipment.location.member_id'),
      member_name: faker.name.findName(),
      parent_id: location.unit_id,
      unit_title: location.unit_title,

      parent_item: {
        id: sequence('equipment.location.parent_item.id'),
        kind: faker.address.city(),
        ref: String(sequence('equipment.location.parent_item.ref'))
      }
    },

    model: {
      id: sequence('equipment.model.id'),
      title: faker.commerce.productName()
    },

    status: {
      id: sequence('equipment.status.id'),
      title: sample.enumerable(EquipmentStatus)
    },

    supplier: {
      id: sequence('equipment.supplier.id'),
      title: faker.company.companyName()
    },

    supplier_ref: {
      id: sequence('equipment.supplier_ref.id'),
      title: faker.commerce.productName()
    },

    urls: {
      image: `/v2/team/equipment/${id}/image`
    }
  }, attributes);
}
