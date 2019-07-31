import deepmerge from 'deepmerge';
import faker from 'faker';
import { sample } from 'lodash';

import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
  getStatusText
} from 'http-status-codes';

import { ApiError } from '../../lib/resources';

export function ApiError(attributes: Partial<ApiError> = {}): ApiError {
  const code = sample([
    BAD_REQUEST,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_ACCEPTABLE,
    NOT_FOUND,
    UNAUTHORIZED,
    UNPROCESSABLE_ENTITY
  ]);

  return deepmerge<ApiError>({
    error: getStatusText(code),
    message: faker.hacker.phrase(),
    statusCode: code,

    meta: {
      reference: faker.random.uuid()
    }
  }, attributes);
}
