import { IsoDate } from './iso-date.model';

/**
 * Periods and Ranges
 * =============================================================================
 *  1. Period is used in the attributes of records with a start/end date.
 *  2. Range is used to query the start/end date in the API.
 */

export interface Period {
  date: IsoDate;
  enddate: IsoDate;
  duration?: number;
}

export interface Range {
  after: IsoDate;
  before: IsoDate;
}
