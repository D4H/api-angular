import { sample } from '../../lib/tools';

describe('sample', () => {
  const numerics: Array<number> = [0, 1, 2];
  const strings: Array<string> = ['Fizz', 'Buzz', 'Blit'];

  enum NumericKeys {
    Fizz,
    Buzz,
    Blit
  }

  enum StringKeys {
    Fizz = 'Fizz',
    Buzz = 'Buzz',
    Blit = 'Blit'
  }

  it('should be a function', () => {
    expect(typeof sample).toBe('function');
    expect(sample.length).toBe(1);
  });

  it('should return a numeric value from NumericKeys enum', () => {
    const value: number = sample(NumericKeys);
    expect(typeof value).toBe('number');
    expect(numerics).toContain(value);
  });

  it('should return a string value from StringKeys enum', () => {
    const value: string = sample(StringKeys);
    expect(typeof value).toBe('string');
    expect(strings).toContain(value);
  });
});
