import { Account } from './account.factory';
import { Activity } from './activity.factory';
import { Attendance } from './attendance.factory';
import { ClientConfig } from './client-config.factory';
import { CustomField } from './custom-field.factory';
import { Duty } from './duty.factory';
import { EmergencyContact } from './emergency-contact.factory';
import { Group } from './group.factory';
import { Language } from './language.factory';
import { Member } from './member.factory';
import { MemberPermission } from './permission.factory';
import { Membership, MembershipModule } from './membership.factory';
import { Note } from './note.factory';
import { Period } from './period.factory';
import { Photo } from './photo.factory';
import { ProxyError } from './proxy-error.factory';
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

export interface FactoryList {
  [key: string]: () => {};
}

export interface FactoryBuilder {
  factories: FactoryList;
  add(factories: { [key: string]: () => {} }): object;
  build<T>(factory: string, ...rest: Array<any>): T;
  buildList<T>(factory: string, length: number, ...rest: Array<any>): Array<T>;
}

export const Factory: FactoryBuilder = {
  factories: {},

  add(factories: FactoryList): any {
    this.factories = {
      ...factories,
      ...this.factories
    };

    return this.factories;
  },

  build<T>(factory: string, ...rest: Array<any>): T {
    if (typeof this.factories[factory] === 'function') {
      return this.factories[factory](...rest) as T;
    } else {
      throw new UnknownFactoryError(factory);
    }
  },

  buildList<T>(factory: string, length: number, ...rest: Array<any>): Array<T> {
    if (typeof this.factories[factory] === 'function') {
      return Array.from({ length }).map(() => this.build(factory, ...rest) as T);
    } else {
      throw new UnknownFactoryError(factory);
    }
  }
};

/**
 * Register D4H Model Factories
 * =============================================================================
 */

Factory.add({
  Account,
  Activity,
  Attendance,
  ClientConfig,
  CustomField,
  Duty,
  EmergencyContact,
  Language,
  Group,
  Member,
  MemberPermission,
  Membership,
  MembershipModule,
  Note,
  Period,
  Photo,
  ProxyError,
  Role,
  StatusLabel,
  Team,
  Username
});
