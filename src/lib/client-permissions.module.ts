import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
  Type
} from '@angular/core';

import { CLIENT_PERMISSIONS } from './providers/permissions.provider';
import { inspections, repairs } from './permissions';

@NgModule({
  providers: [
    {
      provide: CLIENT_PERMISSIONS,
      useValue: { inspections, repairs },
      multi: true
    }
  ]
})
export class ClientPermissionsModule {}
