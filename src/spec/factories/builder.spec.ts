import * as faker from 'faker';

import { Factory, FactoryList, UnknownFactoryError } from './builder';

describe('Factory', () => {
  let badFactory: string;
  let count: number;
  let factory: string;
  let key: string;
  let value: string;

  beforeEach(() => {
    badFactory = faker.lorem.word();
    count = faker.random.number({ min: 7, max: 15 });
    factory = Object.keys(FactoryList)[0];
    key = faker.internet.domainWord();
    value = faker.internet.domainWord();
  });

  describe('Factory#build', () => {
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
});

describe('FactoryList', () => {
  it('should have the appropriate keys', () => {
    const keys: Array<string> = [
      'Account',
      'Activity',
      'Attendance',
      'ClientConfig',
      'CustomField',
      'Duty',
      'EmergencyContact',
      'Language',
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

    expect(Object.keys(FactoryList)).toEqual(keys);
  });

  it('should have appropriate accessors', () => {
    const allFunctions: boolean = Object.values(FactoryList)
      .every(val => typeof val === 'function');

    expect(allFunctions).toBe(true);
  });
});
