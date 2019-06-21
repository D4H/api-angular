import moment from 'moment';

/**
 * Query Parameter
 * =============================================================================
 * All queryable index endpoints accept at least sort, limit and offset. Limit
 * and offset work as you'd expect. For sort order, per @tdtm:
 *
 *  > One or many &sort=foo where foo is the field name. They'll be applied in
 *  > the order provided. foo can be suffixed with a direction in the form :asc
 *  > or desc; it defaults to asc if omitted.
 *
 * @example
 *
 *  GET /team/ponies?sort=sparkles
 *  GET /team/ponies?sort=sparkles:asc
 *  GET /team/ponies?sort=sparkles:desc
 *
 * @see https://github.com/D4H/decisions-project/issues/2757#issuecomment-455324305
 */

export interface Search {
  limit?: number;
  offset?: number;
  sort?: string;
}

/**
 * Query Pagination Information
 * =============================================================================
 * Query responses will eventually all have Datatabes-compatibile paging
 * information.
 */

export interface Page {
  offset: number;
  pageSize: number;
  rowReturned: number;
  pageCurrent: number;
  pageCount: number;
  rowsTotal: number;
}

/**
 * Query DateParameterParameter
 * =============================================================================
 * Two values are accepted in before/after date fields in the API:
 *
 *  1. ISO 8601 format string with a timestamp.
 *  2. "now", which represents this moment in time.
 *
 * Using "now":
 *
 *  "Before" fields: Period records whose  _end_  date is <= /now/.
 *  "After"  fields: Period records whose _start_ date is >= /now/.
 */

export type DateParameter = Date | moment.Moment | string | 'now';

/**
 * Root Response Object
 * =============================================================================
 * All responses have a status code and a meta object for any errors. The meta
 * object will only hold data in error responses.
 */

export interface Response<T> {
  data: T;
  statusCode: number;
  meta?: Page;
}

/**
 * Object Model Errors
 * =============================================================================
 * On invalid POST/PUT.
 *
 * @see: https://github.com/D4H/decisions-project/issues/2521
 */

export interface ModelError {
  constraint: string;
  key: string;
  message: string;
  path: string;
  type: string;
}

/**
 * API Error Responses
 * =============================================================================
 * Error codes: 400, 403, 404, 422.
 */

export interface Error {
  error: string;
  message: string;
  statusCode: number;

  meta: {
    reference: string;
  };

  validation?: {
    errors: Array<ModelError>;
    keys: Array<string>;
    source: string;
  };
}
