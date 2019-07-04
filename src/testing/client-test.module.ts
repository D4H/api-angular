import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { TestBedStatic } from '@angular/core/testing';
import { of } from 'rxjs';

import { Factory } from './factories';

import {
  API_AUTHENTICATED_ROUTES,
  API_ROUTES,
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  ClientConfig,
  authenticatedRoutes,
  clientDefaultConfig,
  routes
} from '../lib/providers';

@NgModule({
  imports: [
    HttpClientTestingModule
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
