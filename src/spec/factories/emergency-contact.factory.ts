import * as faker from 'faker';
import * as merge from 'deepmerge';

import { EmergencyContact } from '../../lib/models';

export function EmergencyContact(attributes: Partial<EmergencyContact> = {}): EmergencyContact {
  return merge<EmergencyContact>({
    alt_phone: faker.phone.phoneNumber(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber()
  }, attributes);
}
