import deepmerge from 'deepmerge';
import faker from 'faker';
import { sequence } from '../tools';

import { Currency, Team } from '../../lib/models';
import { sample } from '../tools';

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
    subdomain: faker.random.uuid(),
    title: faker.company.companyName(),

    // TODO: Fake out on international unit names. D4H teams are worldwide.

    timezone: {
      location: 'Europe/Dublin',
      offset: '+01:00'
    },

    units: {
      currency: faker.finance.currencySymbol() as Currency,

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