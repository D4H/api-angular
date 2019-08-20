import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
  Type
} from '@angular/core';

import {
  API_AUTHENTICATED_ROUTES,
  API_ROUTES,
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  Config,
  Region,
  Version,
  authenticatedRoutes,
  defaultConfig,
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
    { provide: API_ROUTES, useValue: routes },
    { provide: API_AUTHENTICATED_ROUTES, useValue: authenticatedRoutes },
    { provide: CLIENT_DEFAULT_CONFIG, useValue: defaultConfig }
  ]
})
export class ClientModule {
  static forRoot(configProvider: Provider): ModuleWithProviders {
    return {
      ngModule: ClientModule,
      providers: [
        configProvider
      ]
    };
  }

  static forFeature(configProvider: Provider): ModuleWithProviders {
    return {
      ngModule: ClientModule,
      providers: [
        configProvider
      ]
    };
  }
}
