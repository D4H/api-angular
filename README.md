[![GitHubStatus for D4H/client](https://github.com/d4h/decisions-mobile-apps/workflows/Test%20@d4h/decisions-mobile-apps/badge.svg)](https://www.npmjs.com/package/@d4h/client) ![npm](https://img.shields.io/npm/v/@d4h/angular.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/D4H/api-angular/blob/master/LICENSE)

# @d4h/angular
@d4h/angular is an Angular 7+ client for the [D4H](https://d4htechnologies.com/) v2 [API](https://api.d4h.org/v2/documentation). It offers:

1. Model interfaces, e.g. `Member`, `Attendance`.
2. Object services: `MemberService`, `AttendanceSerivice`.
3. API endpoint interfaces: `Members.Update`, `Attendances.Index`.

## Installation

`npm install --save @d4h/angular`

## Configuration
The client accepts a configuration which can either be static or yielded by an [observable](http://reactivex.io/).

### API Regions
@d4h/angular supports all D4H API regions. Please contact <support@d4h.org> if you have questions about which is the correct data region for you to use.

```typescript
export enum Region {
  America = 'api.d4h.org',
  Canada = 'api.ca.d4h.org',
  Europe = 'api.eu.d4h.org',
  Pacific = 'api.ap.d4h.org',
  Staging = 'api.st.d4h.org'
}
```

### Format
Injected configurations are evaluated when the client makes an API request. This permits for dynamic applications where the account or team membership tokens can change in the course of use.

```typescript
interface Config {
  region: Region;

  client: {
    name: string;
    version: string;
  };

  tokens: {
    account?: string;
    organisation?: string;
    team?: string;
  };
}
```

## Use
Import and call `ClientModule.forFeature()` with a configuration. Configuration must be passed as an observable, using the [`of` operator](https://www.learnrxjs.io/learn-rxjs/operators/creation/of) at its simplest.

```typescript
import { CLIENT_CONFIG, ClientConfig } from '@4h/angular';
import { Provider } from '@angular/core';
import { of } from 'rxjs';

const clientConfigProvider: Provider = {
  provide: CLIENT_CONFIG,
  useValue: of({
    region: Region.Staging,

    client: {
      name: 'Minas Tirith Siege Disaster Response',
      version: '3.0.19'
    },

    tokens: {
      account: 'YdRM8Tz78tIfJ3jqhyzz',
      team: 'LKYW5USNLWAwyqy5VNcA'
    }
  }
};

@NgModule({
  imports: [
    ClientModule.forFeature(clientConfigProvider)
  ]
})
export class AppModule {}
```

```typescript
import { AccountService, Username } from '@d4h/angular';

export class UsernameComponent {
  constructor(private readonly accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.username('caira').subscribe(console.log);
  }
}
```

### NgRX Store Selector Injection
D4H Angular applications rely on [NgRx](https://ngrx.io/) for internal state management. Store states are a singleton class instance-selectors only work while instantiated. With some slight changes it is quite possible to inject a selected configuration:

```typescript
import { CLIENT_CONFIG, ClientConfig, ClientModule } from '@4h/angular';
import { Provider } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState, getClientConfig } from '@app/store';

const clientConfigProvider: Provider = {
  provide: CLIENT_CONFIG,
  deps: [Store],
  useFactory(store: Store<AppState>): Observable<ClientConfig> {
    return store.pipe(select(getClientConfig));
  }
};

@NgModule({
  imports: [
    ClientModule.forFeature(clientConfigProvider)
  ]
})
export class AppModule {}
```

## Resources

### Interfaces
API resource interfaces are available if you wish to build your own services. Interfaces follow the Rails controller convention where resources are RESTful:

```typescript
import { Attendances } from '@d4h/angular';
```

Interface | Method | Purpose
---|---|----
`Attendances.Search` | `GET /team/attendance` | Permitted query parameters.
`Attendances.Index` | `GET /team/attendance` | API response.
`Attendances.Show` | `GET /team/attendance/:id` | API response.
`Attendaces.New` | `POST /team/attendance` | Permitted create attributes.
`Attendaces.New` | `POST /team/attendance` | API response.
`Attendances.Change` | `PUT /team/attendance/:id` | Permitted update attributes.
`Attendances.Update` | `PUT /team/attendance/:id` | API response.
`Attendances.Destroy` | `DELETE /team/attendance/:id` | API response.

### Available Resources
@d4h/angular support operations currently used internally by D4H applications. If you require a resource not supported here, either [open an issue](https://github.com/D4H/angular/issues/new) or reach out to <support@d4h.org>.

- `AccountService`:
    - `authenticate(username, password)`
    - `memberships([params])`
    - `username(username)`
- `ActivityService`:
    - `index([query])`
    - `show(id)`
- `AttendanceService`:
    - `index([query])`
    - `show(id)`
    - `create([params])`
    - `update(id[, params])`
    - `destroy(id)`
- `CalendarService`
    - `index([query])`: Query union of `Attendance` and `Duty` records in a common format suitable for use in JavaScript calendar software.
- `CategoryService`:
    - `index([query])`
    - `show(id)`
    - `create([params])`
    - `update(id[, params])`
    - `destroy(id)`
- `DestinationService`: Query new destination for equipment from union of equipment, locations or members.
    - `index([query])`
    - `show({ id, type })`
    - `barcode(barcode)`
    - `contents({ id, type })`
    - `set(equipmentId, { id, type })`: Move equipment to new destination.
    - `search(type, query[, params])`
- `DutyService`:
    - `index([query])`
    - `show(id)`
    - `create([params])`
    - `update(id[, params])`
    - `destroy(id)`
- `GroupService`:
    - `index([query])`
    - `show(id)`
- `EquipmentService`:
    - `index([query])`
    - `show(id)`
    - `barcode(barcode)`: Fetch Equipment item by barcode.
    - `ref(ref)`: Fetch Equipment item item by reference.
    - `move(id, destinationType, destinationId)`: Move equipment to new destination.
    - `update(id[, params])`
    - `image(id, [params])`
    - `search([text[, params]])`: Search equipment by `equipment.ref === text || equipment.barcode === text`
- `InspectionService`:
    - `index([query])`
    - `show(id)`
    - `update(id[, params])`
- `InspectionResultService`:
    - `index([search])`
    - `show(id)`
    - `update(id[, params])`
- `KindService`:
    - `index([query])`
    - `show(id)`
    - `create([params])`
    - `update(id[, params])`
    - `destroy(id)`
- `LocationService`:
    - `index([query])`
    - `show(id)`
    - `destroy(id)`
    - `search([text[, params]])`
- `MemberService`:
    - `index([query])`
    - `show(id)`
    - `update(id[, params])`
    - `destroy(id)`
    - `groups(id)`
    - `image(id, [params])`
    - `labels()`
    - `search([text[, params]])`
- `NoteService`:
    - `index([query])`
    - `show(id)`
    - `create([params])`
    - `update(id[, params])`
    - `destroy(id)`
- `PhotoService`:
    - `get(url[, params])`
    - `membership(url, membership[, params])`
- `RepairService`:
    - `index([query])`
    - `show(id)`
    - `create([params])`
    - `update(id[, params])`
- `RoleService`:
    - `index([query])`
    - `show(id)`
- `TeamService`:
    - `show(team)`
    - `image(team,[ params])`
    - `settings(team, setting)`

## Support and Feedback
Feel free to email <support@d4h.org>, [open an issue](https://github.com/D4H/api-angular/issues/new) or tweet [@d4h](https://twitter.com/d4h/).

## License
Copyright (C) 2019 [D4H](https://d4htechnologies.com/)

Licensed under the [MIT](LICENSE) license.
