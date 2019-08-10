/**
 * Is Object Datelike?
 * =============================================================================
 * Extracted from isMoment() and isDate() in moment.js
 *
 * @see https://github.com/moment/moment/blob/2e2a5b35439665d4b0200143d808a7c26d6cd30f/src/lib/moment/constructor.js#L75-L77
 * @see https://github.com/moment/moment/blob/2e2a5b35439665d4b0200143d808a7c26d6cd30f/src/lib/utils/is-date.js
 */

export function isDateLike(value: any): boolean {
  return Boolean(value) && (
    value._isAMomentObject
    || value instanceof Date
    || Object.prototype.toString.call(value) === '[object Date]'
  );
}
