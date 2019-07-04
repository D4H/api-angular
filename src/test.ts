// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es7/reflect';
import 'jasmine-expect';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// FIXME: Temp context which ignores client specs!
// FIXME: Update tsconfig.spec.json when I change this!
const context = require.context('./', true, /(provider|service|tool)\.spec\.ts$/);
// Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
