import * as faker from 'faker';
import * as merge from 'deepmerge';

import { Activity, ActivityType } from '../../lib/models';
import { Period } from './period.factory';
import { sequence } from './sequence';
import { sample } from '../utilities';

export function Activity(attributes: Partial<Activity> = {}): Activity {
  const lat: number = Number(faker.address.latitude());
  const lng: number = Number(faker.address.longitude());
  const refAutoid: string = String(sequence('activity.ref'));
  const title: string = faker.commerce.productName();
  const { date, enddate } = Period();

  return merge<Activity>({
    activity: sample(ActivityType),
    archived: faker.random.boolean(),
    // bearing
    count_attendance: sequence('activity.count_attendance'),
    count_equipment_used: sequence('activity.count_equipment_used'),
    count_guests: sequence('activity.count_guests'),
    countryaddress: faker.address.country(),
    date,
    description: faker.lorem.paragraphs(),
    // distance
    enddate,
    // gridref
    id: sequence('activity.id'),
    lat,
    latlng: `${lat},${lng}`,
    lng,
    // location_bookmark_id
    night: faker.random.boolean(),
    perc_attendance: sequence('activity.perc_attendance'),
    plan: faker.lorem.paragraphs(),
    postcodeaddress: faker.address.zipCode(),
    pretasked: faker.random.boolean(),
    published: faker.random.boolean(),
    ref: `${refAutoid} ${title}`,
    ref_autoid: refAutoid,
    regionaddress: faker.address.state(),
    streetaddress: faker.address.streetAddress(),
    // tasked_mobile
    team_id: sequence('activity.team_id'),
    title,
    townaddress: faker.address.city()
    // weather
    // tracking_number
  }, attributes);
}
