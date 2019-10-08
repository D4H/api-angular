import deepmerge from 'deepmerge';
import faker from 'faker';

import { Location } from './location.factory';
import { sample, sequence } from '../tools';

import {
  Currency,
  Equipment,
  EquipmentCost,
  EquipmentStatus,
  EquipmentType
} from '../../lib/models';

const cost = ({
  currency = faker.finance.currencySymbol() as Currency,
  value = faker.random.number()
} = {}) => ({ currency, value });

export function Equipment(attributes: Partial<Equipment> = {}): Equipment {
  const critical = faker.random.boolean();
  const id = sequence('equipment.id');
  const location = Location();
  const monitor = faker.random.boolean();

  return deepmerge<Equipment>({
    // date_expires: Date;
    // date_last_status_change: Date;
    // date_retired: Date;
    // date_warranty: Date;
    // is_all_child_op: boolean;
    // minutes_use: number;
    // odometer_reading: number;
    // odometer_reading_date: Date;
    // odometer_reading_total: number;
    // odometer_reading_total_allowed: number;
    // ref: string;
    // serial: string;
    // total_weight: Weight;

    barcode: faker.random.uuid(),
    cost_per_distance: cost(),
    cost_per_hour: cost(),
    cost_per_use: cost(),
    critical_alert: critical,
    custom_fields: [],
    date_firstuse: faker.date.past().toISOString(),
    date_last_moved: faker.date.past().toISOString(),
    date_last_status_change: faker.date.past().toISOString(),
    date_manufactured: faker.date.past().toISOString(),
    date_purchased: faker.date.past().toISOString(),
    expire_alert: monitor,
    id,
    is_critical: critical,
    is_monitor: monitor,
    notes: faker.lorem.paragraph(),
    quantity: faker.random.number({ min: 9, max: 15 }),
    replacement_cost: cost(),
    team_id: sequence('equipment.team_id'),
    title: faker.commerce.productName(),
    total_replacement_cost: cost(),
    type: sample<EquipmentType>(EquipmentType),

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
      id: sample<EquipmentStatus>(EquipmentStatus),
      title: faker.commerce.productName()
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
