import faker from 'faker';

import {
  Factory,
  FactoryList,
  UnknownFactoryError
} from '../../lib/factories/factory.tool';

describe('Factory', () => {
  let badFactory: string;
  let factory: string;

  beforeEach(() => {
    badFactory = faker.lorem.word();
    factory = Object.keys(Factory.factories)[0];
  });

  describe('build', () => {
    let key: string;
    let value: string;

    beforeEach(() => {
      key = faker.random.uuid();
      value = faker.random.uuid();
    });

    it('should be a function', () => {
      expect(typeof Factory.build).toBe('function');
    });

    it ('should throw an error when passed an invalid factory', () => {
      expect(() => Factory.build(badFactory))
        .toThrow(new UnknownFactoryError(badFactory));
    });

    it('should build an object based on input parameters', () => {
      expect(Factory.build(factory)).toBeObject();
    });

    it('should build an object based on input parameters', () => {
      expect(Factory.build(factory, { [key]: value })[key]).toEqual(value);
    });
  });

  describe('buildList', () => {
    it('should be a function', () => {
      expect(typeof Factory.buildList).toBe('function');
    });

    it('should return the appropriate number of records', () => {
      const count: number = faker.random.number({ min: 7, max: 15 });
      expect(Factory.buildList(factory, { count }).length).toEqual(count);
    });

    it('should throw an error when passed an invalid factory', () => {
      expect(() => Factory.buildList(badFactory))
        .toThrow(new UnknownFactoryError(badFactory));
    });

    it('should build an array of objects based on input parameters', () => {
      expect(Factory.buildList(factory)).toBeArrayOfObjects();
    });

    it('should produce between 1-15 records by default', () => {
      spyOn(faker.random, 'number');
      Factory.buildList(factory);
      expect(faker.random.number).toHaveBeenCalledWith({ min: 1, max: 15 });
    });

    it('should pass {} by default for attributes', () => {
      spyOn(Factory, 'build');
      Factory.buildList(factory);
      expect(Factory.build).toHaveBeenCalledWith(factory, {});
    });
  });

  describe('Factory.factories', () => {
    it('should have the correct accessor', () => {
      expect(typeof Factory.factories).toBe('object');
    });

    it('should have the appropriate keys', () => {
      const keys: Array<string> = [
        'Account',
        'Activity',
        'ApiError',
        'Attendance',
        'Blob',
        'Brand',
        'Category',
        'Config',
        'CurrencyCost',
        'CustomField',
        'Duty',
        'EmergencyContact',
        'Equipment',
        'Group',
        'HttpError',
        'Inspection',
        'Language',
        'Location',
        'Member',
        'MemberPermission',
        'Membership',
        'MembershipModule',
        'Model',
        'Note',
        'Password',
        'Period',
        'ProxyError',
        'Repair',
        'Result',
        'Role',
        'SafeUrl',
        'StatusLabel',
        'SymbolCost',
        'Team',
        'Username'
      ];

      expect(Object.keys(Factory.factories)).toEqual(keys);
    });

    it('should have appropriate accessors', () => {
      const allFunctions: boolean = Object.values(Factory.factories)
        .every(val => typeof val === 'function');

      expect(allFunctions).toBe(true);
    });
  });

  // Create a shallow copy of Factory.factories before we do crazy mutations.
  // Then restore it after tests end.

  describe('Factory.add', () => {
    const factories = { ...Factory.factories };
    let testFactories: FactoryList;
    let keys: Array<string>;

    beforeEach(() => {
      Factory.factories = {};
    });

    afterEach(() => {
      Factory.factories = factories;
    });

    beforeEach(() => {
      keys = [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid()
      ];

      testFactories = keys.reduce(
        (acc, key: string) => ({ ...acc, [key]: () => key }),
        {}
      );
    });

    it('should reset Factory.factories before tests', () => {
      expect(Factory.factories).toEqual({});
    });

    it('should add new factories', () => {
      Factory.add(testFactories);
      expect(Factory.factories).toEqual(testFactories);

      keys.forEach((key: string) => {
        expect(Factory.build(key)).toEqual(key);
      });
    });
  });
});
