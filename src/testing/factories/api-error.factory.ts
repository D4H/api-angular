import deepmerge from 'deepmerge';
import faker from 'faker';

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
  const statusCode = faker.random.arrayElement([
    BAD_REQUEST,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_ACCEPTABLE,
    NOT_FOUND,
    UNAUTHORIZED,
    UNPROCESSABLE_ENTITY
  ]);

  return deepmerge<ApiError>({
    error: getStatusText(attributes.statusCode || statusCode),
    message: faker.hacker.phrase(),
    statusCode,

    meta: {
      reference: faker.random.uuid()
    }
  }, attributes);
}
