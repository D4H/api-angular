import * as moment from 'moment';
import * as faker from 'faker';
import * as merge from 'deepmerge';

import { Period } from '../../lib/models';

export function Period(attributes: Partial<Period> = {}): Period {
  const date: moment.Moment = moment(faker.date.future());
  const enddate: moment.Moment = moment(date).add(1, 'day');

  return merge<Period>({
    date: date.toISOString(),
    enddate: enddate.toISOString(),
    duration: date.diff(enddate, 'minutes')
  }, attributes);
}
