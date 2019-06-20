/**
 * Periods and Ranges
 * =============================================================================
 *
 *  1. Period is used in the attributes of records with a start/end date.
 *  2. Range is used to query the start/end date in the API.
 */

export interface Period {
  date: Date;
  enddate: Date;
  duration?: number;
}

export interface Range {
  after: Date;
  before: Date;
}
