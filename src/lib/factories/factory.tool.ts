import faker from 'faker';

import { Account } from './account.factory';
import { Activity } from './activity.factory';
import { ApiError } from './api-error.factory';
import { Attendance } from './attendance.factory';
import { Brand } from './brand.factory';
import { Category } from './category.factory';
import { Config } from './config.factory';
import { CurrencyCost, SymbolCost } from './cost.factory';
import { CustomField } from './custom-field.factory';
import { Duty } from './duty.factory';
import { EmergencyContact } from './emergency-contact.factory';
import { Equipment } from './equipment.factory';
import { Group } from './group.factory';
import { Inspection } from './inspection.factory';
import { Language } from './language.factory';
import { Location } from './location.factory';
import { Member } from './member.factory';
import { MemberPermission } from './permission.factory';
import { Membership, MembershipModule } from './membership.factory';
import { Model } from './model.factory';
import { Note } from './note.factory';
import { Password } from './password.factory';
import { Period } from './period.factory';
import { Photo } from './photo.factory';
import { ProxyError } from './proxy-error.factory';
import { Repair } from './repair.factory';
import { Result } from './result.factory';
import { Role } from './role.factory';
import { StatusLabel } from './status.factory';
import { Team } from './team.factory';
import { Username } from './username.factory';

/**
 * Model Factories
 * =============================================================================
 * Register imported factories and export builder/list builder.
 */

export class UnknownFactoryError extends Error {
  constructor(factory?: string) {
    super(`Unknown factory ${factory}`);
  }
}

interface BuildListOptions {
  attributes?: object;
  count?: number;
}

export type Builder<T> = (...args: Array<any>) => T;

export interface FactoryList {
  [key: string]: Builder<any>;
}

export class Factory {
  static factories: FactoryList = {};

  static add(factories: FactoryList): FactoryList {
    Factory.factories = {
      ...factories,
      ...Factory.factories
    };

    return Factory.factories;
  }

  static build<T>(factory: string, ...rest: Array<any>): T {
    if (typeof Factory.factories[factory] === 'function') {
      return Factory.factories[factory](...rest) as T;
    } else {
      throw new UnknownFactoryError(factory);
    }
  }

  static buildList<T>(factory: string, options: BuildListOptions = {}): Array<T> {
    const {
      attributes = {},
      count = faker.random.number({ min: 1, max: 15 })
    } = options;

    return Array.from({ length: count }).map(() => Factory.build(factory, attributes) as T);
  }
}

/**
 * Register D4H Model Factories
 * =============================================================================
 */

Factory.add({
  Account,
  Activity,
  ApiError,
  Attendance,
  Brand,
  Category,
  Config,
  CurrencyCost,
  CustomField,
  Duty,
  EmergencyContact,
  Equipment,
  Group,
  Inspection,
  Language,
  Location,
  Member,
  MemberPermission,
  Membership,
  MembershipModule,
  Model,
  Note,
  Password,
  Period,
  Photo,
  ProxyError,
  Repair,
  Result,
  Role,
  StatusLabel,
  SymbolCost,
  Team,
  Username
});
