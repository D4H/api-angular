import { Factory } from '@d4h/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { of } from 'rxjs';

import { ApiHttpClient, AuthClient, ParserClient } from '../lib/client';

import {
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  Config,
  defaultConfig,
} from '../lib/providers/config.provider';

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
    ApiHttpClient,
    AuthClient,
    ParserClient,
    { provide: API_ROUTES, useValue: routes },
    { provide: API_AUTHENTICATED_ROUTES, useValue: authenticatedRoutes },
    { provide: CLIENT_DEFAULT_CONFIG, useValue: defaultConfig },
    { provide: CLIENT_CONFIG, useValue: of(defaultConfig) }
  ]
})
export class ClientTestModule {
  static forRoot(
    config: Config = Factory.build<Config>('Config')
  ): ModuleWithProviders {
    return {
      ngModule: ClientTestModule,
      providers: [
        { provide: CLIENT_CONFIG, useValue: of(config) }
      ]
    };
  }
}
