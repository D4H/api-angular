import faker from 'faker';
import deepmerge from 'deepmerge';
import moment from 'moment';

import { CustomField, CustomFieldType, CustomFieldValue } from 'bindings/lib/models';
import { sample } from '../tools';
import { sequence } from './sequence';

/**
 * Custom Field Factory
 * =============================================================================
 * This factory does not offer an exhaustative replication of single- or
 * multiple-choice custom fields because those are a pain in the butt to setup.
 */

export function CustomField(attributes: Partial<CustomField> = {}): CustomField {
  const type: CustomFieldType = sample(CustomFieldType);
  const value: CustomFieldValue = customFieldValue(type);

  return deepmerge<CustomField>({
    archived: faker.random.boolean(),
    bundle: faker.random.objectElement(),
    choices: undefined,
    entity_id: sequence('custom-field.member_id'),
    hint: faker.lorem.sentence(),
    id: sequence('custom-field.id'),
    label: faker.commerce.productName(),
    member_edit_own: faker.random.boolean(),
    ordering: sequence('custom-field.order'),
    postfix: null,
    required: faker.random.boolean(),
    secure: faker.random.boolean(),
    type,
    value,
    value_string: String(value)
  }, attributes);
}

function customFieldValue(type: CustomFieldType): CustomFieldValue {
  switch (type) {
    case CustomFieldType.Float:
    case CustomFieldType.Int:
    case CustomFieldType.Number: {
      return faker.random.number();
    }

    case CustomFieldType.Date:
    case CustomFieldType.DateTime: {
      return faker.date.recent();
    }

    case CustomFieldType.Time: {
      return moment(faker.date.recent()).format('HH:mm');
    }

    case CustomFieldType.Text:
    case CustomFieldType.TextArea:
    default: {
      return faker.lorem.sentence();
    }
  }
}
