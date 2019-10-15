import deepmerge from 'deepmerge';
import faker from 'faker';

import { Brand } from './brand.factory';
import { Category } from './category.factory';
import { CurrencyCost } from './cost.factory';
import { Location } from './location.factory';
import { Model } from './model.factory';
import { sample, sequence } from '../tools';

import {
  Equipment,
  EquipmentStatus,
  EquipmentType,
  Weight
} from '../../lib/models';

const weight = ({
  units = 'kg' as Weight,
  value = faker.random.number()
} = {}) => ({ units, value });

export function Equipment(attributes: Partial<Equipment> = {}): Equipment {
  const brand = Brand();
  const category = Category();
  const critical = faker.random.boolean();
  const id = sequence('equipment.id');
  const location = Location();
  const model = Model();
  const monitor = faker.random.boolean();

  return deepmerge<Equipment>({
    // is_all_child_op: boolean;
    // minutes_use: number;
    // odometer_reading: number;
    // odometer_reading_date: Date;
    // odometer_reading_total: number;
    // odometer_reading_total_allowed: number;
    // ref: string;

    barcode: faker.random.uuid(),
    cost_per_distance: CurrencyCost(),
    cost_per_hour: CurrencyCost(),
    cost_per_use: CurrencyCost(),
    critical_alert: critical,
    custom_fields: [],
    date_expires: faker.date.future().toISOString(),
    date_firstuse: faker.date.past().toISOString(),
    date_last_moved: faker.date.past().toISOString(),
    date_last_status_change: faker.date.past().toISOString(),
    date_manufactured: faker.date.past().toISOString(),
    date_purchased: faker.date.past().toISOString(),
    date_retired: faker.date.future().toISOString(),
    date_warranty: faker.date.future().toISOString(),
    expire_alert: monitor,
    id,
    is_critical: critical,
    is_monitor: monitor,
    notes: faker.lorem.paragraph(),
    quantity: faker.random.number({ min: 9, max: 15 }),
    replacement_cost: CurrencyCost(),
    serial: faker.random.uuid(),
    team_id: sequence('equipment.team_id'),
    title: faker.commerce.productName(),
    total_replacement_cost: CurrencyCost(),
    total_weight: weight(),
    type: sample<EquipmentType>(EquipmentType),
    weight: weight(),

    brand: {
      id: brand.id,
      title: brand.title
    },

    category: {
      id: category.id,
      title: category.title
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
      id: model.id,
      title: model.title
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
