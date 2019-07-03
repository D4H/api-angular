import faker from 'faker';
import deepmerge from 'deepmerge';

import { CustomField } from './custom-field.factory';
import { Duty } from './duty.factory';
import { DutyType, Member, OperationalStatus } from '../../lib/models';
import { EmergencyContact } from './emergency-contact.factory';
import { MemberPermission } from './permission.factory';
import { StatusLabel } from './status.factory';
import { sample } from '../tools';
import { sequence } from './sequence';

/**
 * Member Factory
 * =============================================================================
 * Per the Member models, a number of fields are restricted because they contain
 * personal information, and are only returned in specific conditions:
 *
 *  1. GET /team/members/me
 *  2. GET /team/members/member_id_associated_with_token
 *  3. GET /team/members/:id with token belonging to >= PermissionType.Editor
 *
 * It is not possible to inter returned values from the input token. The Member
 * returned by this factory is as when any of the above conditions are met, for
 * ease of testing.
 */

export function Member(attributes: Partial<Member> = {}): Member {
  const id: number = sequence('member.id');
  const duty = Duty({ member_id: id });
  const status = StatusLabel();

  return deepmerge<Member>({
    address: faker.address.streetAddress(), // Restricted
    default_duty: sample(DutyType),
    default_role_id: sequence('member.default_role_id'),
    duty_end: duty.enddate,
    duty_id: duty.id,
    duty_role_id: duty.role.id,
    duty_start: duty.date,
    duty_type: duty.type === DutyType.Off ? 0 : 1,
    email: faker.internet.email(),
    homephone: faker.phone.phoneNumber(), // Restricted
    id,
    mobilephone: faker.phone.phoneNumber(),
    name: faker.name.findName(),
    notes: faker.lorem.sentence(),
    on_call: duty.type === DutyType.On,
    pager: faker.phone.phoneNumber(),
    pager_email: faker.internet.email(),
    permission: MemberPermission(), // Restricted
    position: faker.name.jobTitle(),
    ref: String(faker.random.number()),
    team_id: sequence('member.team_id'),
    workphone: faker.phone.phoneNumber(),

    status: {
      id: status.id,
      type: status.type,
      value: status.value
    },

    custom_fields: [
      CustomField({ entity_id: id }),
      CustomField({ entity_id: id })
    ],

    duty_status: {
      date: duty.date,
      duty_id: duty.id,
      enddate: duty.enddate,
      role_id: duty.role.id,
      role_title: duty.role.title,
      status: duty.type
    },

    // Restricted
    emergency_contacts: [
      EmergencyContact(),
      EmergencyContact()
    ]
  }, attributes);
}
