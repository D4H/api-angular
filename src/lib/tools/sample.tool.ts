import faker from 'faker';

/**
 * Sample Enumerable Object
 * =============================================================================
 * Return random value from an enumerable, useful for generating random
 * configurations. If an enumerable is numeric (example Foo), sample will return
 * a numeric value. Otherwise it will be a string.
 *
 * @example
 *
 *   var Foo;
 *   (function (Foo) {
 *       Foo[Foo["Fizz"] = 0] = "Fizz";
 *       Foo[Foo["Buzz"] = 1] = "Buzz";
 *       Foo[Foo["Blit"] = 1] = "Blit";
 *   })(Foo || (Foo = {}));
 *
 * @example
 *
 *   var Bar;
 *   (function (Bar) {
 *       Bar["Fizz"] = "Fizz";
 *       Bar["Bar"] = "Bar";
 *   })(Bar || (Bar = {}));
 *
 * @see https://github.com/Marak/faker.js/issues/541#issuecomment-328647139
 */

export function sample<T>(enumerable: object): T {
  const numeric = (value: string): boolean => /^\d+$/.test(value);
  let keys: Array<any> = Object.keys(enumerable);

  if (keys.some(numeric)) {
    keys = keys.filter(key => !numeric(key));
  }

  return enumerable[faker.random.arrayElement(keys)];
}
