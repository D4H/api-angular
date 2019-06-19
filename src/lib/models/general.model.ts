/**
 * Object Date Attribute
 * =============================================================================
 * All D4H objects return the date in ISO-8601 format.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 *
 * @example
 *
 *   2006-07-15T11:30:00.000Z
 *   2009-09-15T23:30:00.000Z
 */

export type IsoDate = string;

/**
 * Numeric Booleans
 * =============================================================================
 * Certain record boolean fields are cast as 0|1 numerics.
 */

export type NumericBoolean = boolean | 0 | 1;
