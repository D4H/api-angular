
/**
 * Model Period Attributes
 * =============================================================================
 * Period is used in the attributes of records with a start/end date. Duration
 * is sometimes present as minutes between date and enddate.
 */

export interface Period {
  date: Date;
  enddate: Date;
  duration?: number;
}
