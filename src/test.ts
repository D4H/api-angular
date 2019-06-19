// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es7/reflect';
import 'jasmine-expect';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBedStatic } from '@angular/core/testing';
import { getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {
  API_AUTHENTICATED_ROUTES,
  API_ROUTES,
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  ClientConfig,
  authenticatedRoutes,
  clientDefaultConfig,
  routes
} from './lib/providers';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/**
 * API Client Module Setup
 * =============================================================================
 * I be lazy. Add services yourself at test-runtime.
 */

export function ConfigureApiModule(testbed: TestBedStatic, config: ClientConfig): void {
  testbed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      { provide: API_ROUTES, useValue: routes },
      { provide: API_AUTHENTICATED_ROUTES, useValue: authenticatedRoutes },
      { provide: CLIENT_CONFIG, useValue: of(config) },
      { provide: CLIENT_DEFAULT_CONFIG, useValue: clientDefaultConfig }
    ]
  });
}
