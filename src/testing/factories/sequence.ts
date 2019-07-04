/**
 * Persistent Factory Sequence
 * =============================================================================
 * Useful for unique, incremented IDs among shared models. Start number is only
 * applied for initial sequence for the given key.
 *
 * @example
 *
 *  sequence('rainbow.id')  // 1
 *  sequence('pony.id')     // 1
 *  sequence('rainbow.id')  // 2
 *  sequence('pony.id', 9)  // 2
 *  sequence('magic.id', 9) // 9
 */

const sequences: { [key: string]: number } = {};

export function sequence(key: string, start: number = 1): number {
  if (Number.isInteger(sequences[key])) {
    sequences[key] = sequences[key] + 1;
  } else if (Number.isInteger(start)) {
    sequences[key] = start;
  } else {
    sequences[key] = 1;
  }

  return sequences[key];
}
