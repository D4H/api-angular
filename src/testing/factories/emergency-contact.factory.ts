import faker from 'faker';
import deepmerge from 'deepmerge';

import { EmergencyContact } from 'bindings/lib/models';

export function EmergencyContact(attributes: Partial<EmergencyContact> = {}): EmergencyContact {
  return deepmerge<EmergencyContact>({
    alt_phone: faker.phone.phoneNumber(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber()
  }, attributes);
}
