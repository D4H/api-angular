import faker from 'faker';

import {
  Factory,
  FactoryList,
  UnknownFactoryError
} from '../../testing/factories/builder';

describe('Factory', () => {
  let badFactory: string;
  let factory: string;

  beforeEach(() => {
    badFactory = faker.lorem.word();
    factory = Object.keys(Factory.factories)[0];
  });

  describe('Factory#build', () => {
    let key: string;
    let value: string;

    beforeEach(() => {
      key = faker.random.objectElement();
      value = faker.random.objectElement();
    });

    it('should have the correct accessor', () => {
      expect(typeof Factory.build).toBe('function');
      expect(Factory.build.length).toBe(1);
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

  describe('Factory#buildList', () => {
    let count: number;

    beforeEach(() => {
      count = faker.random.number({ min: 7, max: 15 });
    });

    it('should have the correct accessor', () => {
      expect(typeof Factory.buildList).toBe('function');
      expect(Factory.buildList.length).toBe(2);
    });

    it('should return the appropriate number of records', () => {
      expect(Factory.buildList(factory, count).length).toEqual(count);
    });

    it ('should throw an error when passed an invalid factory', () => {
      expect(() => Factory.buildList(badFactory, 1))
        .toThrow(new UnknownFactoryError(badFactory));
    });

    it('should build an array of objects based on input parameters', () => {
      expect(Factory.buildList(factory, count)).toBeArrayOfObjects();
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
        'Attendance',
        'ClientConfig',
        'Cost',
        'CustomField',
        'Duty',
        'EmergencyContact',
        'Equipment',
        'Language',
        'Location',
        'Group',
        'Member',
        'MemberPermission',
        'Membership',
        'MembershipModule',
        'Note',
        'Period',
        'Photo',
        'ProxyError',
        'Role',
        'StatusLabel',
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

    beforeAll(() => {
      Factory.factories = {};
    });

    afterAll(() => {
      Factory.factories = factories;
    });

    beforeEach(() => {
      keys = [
        faker.random.objectElement(),
        faker.random.objectElement(),
        faker.random.objectElement(),
        faker.random.objectElement()
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
