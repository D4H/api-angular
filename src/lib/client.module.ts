import { HttpClientModule } from '@angular/common/http';
import { Observable, isObservable, of } from 'rxjs';

import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
  Type
} from '@angular/core';

import { ApiHttpClient, AuthClient, ParserClient } from './client';

import {
  AccountService,
  ActivityService,
  AttendanceService,
  DutyService,
  GroupService,
  MemberService,
  NoteService,
  RoleService
} from './services';

import {
  API_AUTHENTICATED_ROUTES,
  API_ROUTES,
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  ClientConfig,
  Version,
  authenticatedRoutes,
  clientDefaultConfig,
  routes
} from './providers';

/**
 * Initialize D4H API Client
 * =============================================================================
 * Configuration may be passed as either an object or an observable. There are
 * many cases where the configuration can change during runetime, such as a user
 * (say), changing team, or changing server.
 *
 * ApiHttpClient executes each to the D4H API is executed in the context of the
 * current configuration.
 */

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ApiHttpClient,
    ActivityService,
    AttendanceService,
    AuthClient,
    GroupService,
    MemberService,
    DutyService,
    NoteService,
    ParserClient,
    RoleService
  ]
})
export class ClientModule {
  static forRoot(config: ClientConfig | Observable<ClientConfig>): ModuleWithProviders {
    return {
      ngModule: ClientModule,
      providers: [
        { provide: API_ROUTES, useValue: routes },
        { provide: API_AUTHENTICATED_ROUTES, useValue: authenticatedRoutes },
        { provide: CLIENT_CONFIG, useValue: isObservable(config) ? config : of(config) },
        { provide: CLIENT_DEFAULT_CONFIG, useValue: clientDefaultConfig }
      ]
    };
  }

  static forChild(config: ClientConfig | Observable<ClientConfig>): ModuleWithProviders {
    return {
      ngModule: ClientModule,
      providers: [
        { provide: API_ROUTES, useValue: routes },
        { provide: API_AUTHENTICATED_ROUTES, useValue: authenticatedRoutes },
        { provide: CLIENT_CONFIG, useValue: isObservable(config) ? config : of(config) },
        { provide: CLIENT_DEFAULT_CONFIG, useValue: clientDefaultConfig }
      ]
    };
  }
}
