import * as faker from 'faker';
import * as merge from 'deepmerge';
import { sequence } from './sequence';

import { Language } from './language.factory';
import { Membership, MembershipModule, MembershipType } from '../../lib/models';
import { sample } from '../utilities';

export function Membership(attributes: Partial<Membership> = {}): Membership {
  return merge<Membership>({
    id: sequence('membership.member_id'),
    language: Language(),
    lastlogin: faker.date.past().toISOString(),
    name: faker.name.findName(),
    token: faker.random.uuid().replace(/-/g, ''),
    type: sample<MembershipType>(MembershipType),

    organisation: {
      id: sequence('membership.organisation_id'),
      name: ''
    },

    unit: {
      id: sequence('membership.team_id'),
      name: faker.company.companyName()
    }
  }, attributes);
}

export function MembershipModule(attributes: Partial<MembershipModule> = {}): MembershipModule {
  return merge<MembershipModule>({
    activities: true,
    address_book: true,
    api_access: true,
    app_equipment_enterprise: true,
    calendar: true,
    charts: true,
    collaboration: true,
    communication: true,
    costing: true,
    courses: true,
    dashboard: true,
    documents: true,
    duty: true,
    emergency_contacts: true,
    equipment: true,
    equipment_funding: true,
    equipment_inspections: true,
    equipment_repairs: true,
    equipment_team_move: true,
    events: true,
    exercises: true,
    groups: true,
    hazmat: true,
    incidents: true,
    lost_behaviour: true,
    mapsar: true,
    members: true,
    old_communication: true,
    persons_involved: true,
    reports: true,
    resources: true,
    roles: true,
    tags: true,
    tasks: true,
    vehicles_involved: true,
    weather: true,
    whiteboard: true
  }, attributes);
}
