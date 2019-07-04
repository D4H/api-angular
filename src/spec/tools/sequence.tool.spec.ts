import faker from 'faker';

import { sequence } from 'bindings/testing';

describe('sequence', () => {
  let key: string;
  let start: number;

  beforeEach(() => {
    key = faker.random.uuid();
    start = faker.random.number();
  });

  it('should have the correct accessor', () => {
    expect(typeof sequence).toBe('function');
    expect(sequence.length).toBe(2);
  });

  it('should return 1 for a new $key and no set $start', () => {
    expect(sequence(key)).toEqual(1);
    expect(sequence(key)).toEqual(2);
    expect(sequence(key)).toEqual(3);
  });

  it('should return 0 for a new $key and a $start of 0', () => {
    // Treating 0 as a boolean is bad, m'kay?
    expect(sequence(key, 0)).toEqual(0);
  });

  it('should return $start for a new $key and a set $start', () => {
    expect(sequence(key, start)).toEqual(start);
    expect(sequence(key, start)).toEqual(start + 1);
    expect(sequence(key, start)).toEqual(start + 2);
  });

  it('should fallback to default $start of 1 when given a non-numeric key', () => {
    const naughtyValues: Array<any> = [
      'moo',
      () => {},
      15.7,
      NaN,
      [],
      false,
      null,
      undefined,
      { hello: 'world' }
    ];

    naughtyValues.forEach((value: any) => {
      key = faker.random.uuid();
      expect(sequence(key, value)).toEqual(1);
      expect(sequence(key, value)).toEqual(2);
      expect(sequence(key, value)).toEqual(3);
    });
  });
});
