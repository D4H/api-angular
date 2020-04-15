import moment from 'moment';

import { isDateLike } from '../../lib/tools';

describe('isDateLike', () => {
  it('should be a function accessor', () => {
    expect(typeof isDateLike).toBe('function');
    expect(isDateLike.length).toBe(1);
  });

  it('should correctly determine the type of value', () => {
    const values = [
      {
        value: Infinity,
        result: false
      },
      {
        value: NaN,
        result: false
      },
      {
        value: [],
        result: false
      },
      {
        value: true,
        result: false
      },
      {
        value: false,
        result: false
      },
      {
        value: '',
        result: false
      },
      {
        value: 15,
        result: false
      },
      {
        value: moment(),
        result: true
      },
      {
        value: new Date(),
        result: true
      },
      {
        value: undefined,
        result: false
      },
      {
        value: true,
        result: false
      },
      {
        value: undefined,
        result: false
      },
      {
        value: {},
        result: false
      }
    ];

    values.forEach(({ value, result }) => {
      expect(isDateLike(value)).toBe(result);
    });
  });
});
