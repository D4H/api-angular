import * as faker from 'faker';
import * as merge from 'deepmerge';

import { Members } from '../../lib/routes';
import { OperationalStatus, StatusLabel } from '../../lib/models';
import { sample } from '../utilities';
import { sequence } from './sequence';

export function StatusLabel(attributes: Partial<StatusLabel> = {}): StatusLabel {
  const organisationId: number = sequence('status-label.organisation_id');
  const teamId: number = sequence('status-label.team_id');
  const type: OperationalStatus = sample(OperationalStatus);

  return merge<StatusLabel>({
    id: sequence('status-label.id'),
    organisation_id: organisationId,
    type,
    value: type,

    labels: [{
      id: sequence('label.id'),
      ordering: sequence('label.ordering'),
      organisation_id: sequence('label.organisation_id'),
      team_id: sequence('label.team_id'),
      value: faker.internet.domainWord()
    }]
  }, attributes);
}
