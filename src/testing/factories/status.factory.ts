import faker from 'faker';
import deepmerge from 'deepmerge';

import { OperationalStatus, StatusLabel } from '../../lib/models';
import { sample } from '../tools';
import { sequence } from './sequence';

export function StatusLabel(attributes: Partial<StatusLabel> = {}): StatusLabel {
  const organisationId: number = sequence('status-label.organisation_id');
  const teamId: number = sequence('status-label.team_id');
  const type: OperationalStatus = sample(OperationalStatus);

  return deepmerge<StatusLabel>({
    id: sequence('status-label.id'),
    organisation_id: organisationId,
    type,
    value: type,

    labels: [{
      id: sequence('label.id'),
      ordering: sequence('label.ordering'),
      organisation_id: sequence('label.organisation_id'),
      team_id: sequence('label.team_id'),
      value: faker.random.objectElement()
    }]
  }, attributes);
}
