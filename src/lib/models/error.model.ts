/**
 * Object Model Errors
 * =============================================================================
 * Model error with invalid attributes on POST/PUT. There are excceptions to
 * this around permissions and certain attributes in combination.
 *
 * @see: https://github.com/D4H/decisions-project/issues/2521
 */

export interface ApiModelError {
  constraint: string;
  key: string;
  message: string;
  path: string;
  type: string;
}

/**
 * API Error Responses
 * =============================================================================
 * Error codes: 400, 403, 404, 422, ...
 */

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;

  meta: {
    reference: string;
  };

  validation?: {
    errors: Array<ApiModelError>;
    keys: Array<string>;
    source: string;
  };
}
