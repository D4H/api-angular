import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { TestBedStatic } from '@angular/core/testing';
import { of } from 'rxjs';

import { Factory } from './factories';

import {
  ApiHttpClient,
  AuthClient,
  ParserClient
} from '../lib/client';

import {
  AccountService,
  ActivityService,
  AttendanceService,
  DutyService,
  GroupService,
  MemberService,
  NoteService,
  RoleService
} from '../lib/services';

import {
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  ClientConfig,
  clientDefaultConfig,
} from '../lib/providers/client.provider';

import {
  API_AUTHENTICATED_ROUTES,
  API_ROUTES,
  authenticatedRoutes,
  routes
} from '../lib/providers/routes.provider';

@NgModule({
  imports: [
    HttpClientTestingModule
  ],
  providers: [
    ActivityService,
    ApiHttpClient,
    AttendanceService,
    AuthClient,
    DutyService,
    GroupService,
    MemberService,
    NoteService,
    ParserClient,
    RoleService
  ]
})
export class ClientTestModule {
  static forRoot(
    config: ClientConfig = Factory.build<ClientConfig>('ClientConfig')
  ): ModuleWithProviders {
    return {
      ngModule: ClientTestModule,
      providers: [
        { provide: CLIENT_CONFIG, useValue: { config$: of(config) } },
        { provide: API_ROUTES, useValue: routes },
        { provide: API_AUTHENTICATED_ROUTES, useValue: authenticatedRoutes },
        { provide: CLIENT_DEFAULT_CONFIG, useValue: clientDefaultConfig }
      ]
    };
  }
}
