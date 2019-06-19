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

export interface ApiError {
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
