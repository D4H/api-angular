import faker from 'faker';
import { ApiError as ApiErrorFactory } from './api-error.factory';
import { ApiError } from '../../lib/api';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Stub HttpErrorResponse
 * =============================================================================
 * This is a stub HttpErrorResponse object for service tests. D4H API services
 * only consider:
 *
 *  - error.status
 *  - error.error
 *
 * This therefore serves as a Good Enough stub for service tests.
 *
 * @see https://angular.io/api/common/http/HttpErrorResponse
 */

export function HttpError(attributes: Partial<ApiError> = {}): HttpErrorResponse {
  const error: ApiError = ApiErrorFactory(attributes);

  return new HttpErrorResponse({
    status: error.statusCode,
    statusText: error.error,
    url: faker.internet.url(),
    error
  });
}
