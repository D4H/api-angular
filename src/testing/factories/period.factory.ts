import faker from 'faker';
import deepmerge from 'deepmerge';
import moment from 'moment';

import { Period } from '../../lib/models';

export function Period(attributes: Partial<Period> = {}): Period {
  const date: moment.Moment = moment(faker.date.future());
  const enddate: moment.Moment = moment(date).add(1, 'day');

  return deepmerge<Period>({
    date: date.toISOString(),
    enddate: enddate.toISOString(),
    duration: date.diff(enddate, 'minutes')
  }, attributes);
}
