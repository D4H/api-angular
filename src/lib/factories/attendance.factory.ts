import deepmerge from 'deepmerge';
import faker from 'faker';

import { ActivityType, Attendance, AttendanceStatus } from '../../lib/models';
import { Activity } from './activity.factory';
import { Period } from './period.factory';
import { sample, sequence } from '../tools';

/**
 * Attendance Factory
 * =============================================================================
 * These represent attendance to an activity of some kind.
 */

export function Attendance(attributes: Partial<Attendance> = {}): Attendance {
  const { date, duration, enddate } = Period();
  const activity = Activity();

  return deepmerge<Attendance>({
    date,
    duration,
    enddate,
    id: sequence('attendance.id'),

    activity: {
      date: activity.date,
      enddate: activity.enddate,
      id: activity.id,
      ref: activity.ref,
      title: activity.title,
      type: activity.activity
    },

    member: {
      id: sequence('attendance.member.id'),
      name: faker.name.findName()
    }

  }, attributes);
}