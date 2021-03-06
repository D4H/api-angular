import * as moment from 'moment';

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

export interface Query {
  limit?: number;
  offset?: number;
  sort?: string;
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
 * Query Pagination Information
 * =============================================================================
 * Query responses will eventually all have Datatabes-compatibile paging
 * information.
 */

export interface Page {
  offset: number;
  pageCount: number;
  pageCurrent: number;
  pageSize: number;
  rowReturned: number;
  rowsTotal: number;
}

/**
 * API Response Object
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
 * API Index Output
 * =============================================================================
 * The public data-and-pagination output from a service index function. Return
 * the array of data and attached pagination.
 */

export interface Index<T> {
  data: Array<T>;
  page?: Page;
}

/**
 * Object Model Errors
 * =============================================================================
 * On invalid POST/PUT.
 *
 * @see: https://github.com/D4H/decisions-project/issues/2521
 */

export interface ModelError {
  constraint: string; // Validation failure type.
  key: string; // Attribute.
  message: string; // Actual validation failue.
  path: string; // Attribute or path.to[0].attribute.
  type: string; // Type of failing attribute, e.g. string, number.
}

/**
 * API Error Responses
 * =============================================================================
 * Error codes: 400, 403, 404, 422.
 */

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;

  meta: {
    reference: string;
  };

  validation?: {
    errors: Array<ModelError>;
    keys?: Array<string>;
    source: string;
  };
}
