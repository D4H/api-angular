import faker from 'faker';
import deepmerge from 'deepmerge';
import { sequence } from './sequence';

import { Team } from '../../lib/models';
import { sample } from '../utilities';

export function Team(attributes: Partial<Team> = {}): Team {
  return deepmerge<Team>({
    calendar_dashboard_activities: faker.random.number(),
    count_members: faker.random.number(),
    count_operational: faker.random.number(),
    country: faker.address.countryCode(),
    default_duty: sequence('team.default_duty'),
    id: sequence('team.id'),
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
    organisation_id: sequence('team.organisation_id'),
    required_oncall: faker.random.number(),
    subdomain: faker.random.objectElement(),
    title: faker.company.companyName(),

    // TODO: Fake out on international unit names. D4H teams are worldwide.

    timezone: {
      location: 'Europe/Dublin',
      offset: '+01:00'
    },

    units: {
      currency: faker.finance.currencySymbol(),

      distance: {
        name: 'kilometer',
        symbol: 'km'
      },

      weight: {
        name: 'metric',
        units: 'kg'
      }
    }
  }, attributes);
}
