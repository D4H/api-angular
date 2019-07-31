/**
 * Sample Enumerable
 * =============================================================================
 * Return random value from an enumerable, useful for generating random
 * configurations. This picks out /string/ value keys only. Give this enum:
 *
 * @example
 *
 *   enum Foo {
 *     Fizz, Buzz
 *   }
 *
 *  var Foo;
 *   (function (Foo) {
 *       Foo[Foo["Fizz"] = 0] = "Fizz";
 *       Foo[Foo["Buzz"] = 1] = "Buzz";
 *   })(Foo || (Foo = {}));
 *
 *   Object.keys(Foo); // ["0", "1", "Fizz", "Buzz"];
 *
 * The regex rejects numeric-matching keys.
 */

export function enumerable<T>(obj: object): T {
  const notNumeric = (value: string): boolean => !/^\d+$/.test(value);
  const keys: Array<string> = Object.keys(obj).filter(notNumeric);
  const key: number = Math.floor(Math.random() * keys.length);

  return obj[keys[key]];
}

export function array<T>(arr: Array<T>): T {
  const key: number = Math.floor(Math.random() * arr.keys.length);
  return arr[key];
}

export const sample = {
  enumerable,
  array
};
