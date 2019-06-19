[![Codeship Status for D4H/api-angular](https://app.codeship.com/projects/8ec182c0-643f-0137-757e-1a7608ff9ea0/status?branch=master)](https://app.codeship.com/projects/344846)
![npm](https://img.shields.io/npm/v/@d4h/angular.svg)

# D4H Angular API Bindings
Bindings is an Angular 7+ client for the [D4H](https://d4htechnologies.com/) v2 [API](https://api.d4h.org/v2/documentation). It offers:

1. Model interfaces, e.g. `Member`, `Attendance`.
2. Object services: `MemberService`, `AttendanceSerivice`.
3. Route and fixture factories for D4H endpoints and business objects.

## Getting Started

### Installation

`npm install --save @d4h/angular`

### API Regions
Bindings supports all D4H API regions. Please consult with your team leader or <support@d4h.org> if you have questions about which data region to use.

```typescript
export enum Region {
  America = 'api.d4h.org',
  Canada = 'api.ca.d4h.org',
  Europe = 'api.eu.d4h.org',
  International = 'api.d4h.org',
  Pacific = 'api.ap.d4h.org',
  Staging = 'api.st.d4h.org'
}
```

### Configuration
Binding accepts a configuration which can either be static or yielded by an [observable](http://reactivex.io/). That bindings reads the configuration at the time a request is made permits for dynamic configurations in contexts where the account or team membership tokens change.

```typescript
export interface ClientConfig {
  region: Region;
  version?: Version;

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

### Using Bindings
Simply import `ApiModule` from the package and import `ApiModule.forRoot` with a configuration.

```typescript
import { ClientConfig, ClientModule, Region } from '@d4h/angular';

const config: Observable<ClientConfig> = of({
  region: Region.Europe,
  client: {
    name: 'Garricorn',
    version: '1.0.1'
  },
  tokens: {
    account: 'YdRM8Tz78tIfJ3jqhyzz',
    team: 'LKYW5USNLWAwyqy5VNcA'
  }
});

@NgModule({
  // ...
  imports: [
    ClientModule.forRoot(config)
  ]
})
export class AppModule {}
```

## Available Resources
Bindings supports those object operations used internally by D4H applications. If you require a resource not supported here, either [open an issue](https://github.com/D4H/api-angular/issues/new) or a pull request with the service!

* Account
    * `authenticate(username, password)`
    * `memberships([params])`
    * `username(username)`
* Activity
    * `index([search])`
    * `show(id)`
* Attendance
    * `index([search])`
    * `show(id)`
    * `create([params])`
    * `update(id[, params])`
    * `destroy(id)`
* Duty
    * `index([search])`
    * `show(id)`
    * `create([params])`
    * `update(id[, params])`
    * `destroy(id)`
* Group
    * `index([search])`
    * `show(id)`
* Member
    * `index([search])`
    * `show(id)`
    * `update(id[, params])`
    * `destroy(id)`
    * `groups(id)`
    * `image(id, [params])`
    * `labels()`
* Note
    * `index([search])`
    * `show(id)`
    * `create([params])`
    * `update(id[, params])`
    * `destroy(id)`
* Photo
    * `get(url[, params])`
    * `membership(url, membership[, params])`
* Role
    * `index([search])`
    * `show(id)`
* Team
    * `show(team)`
    * `image(team,[ params])`
    * `settings(team, setting)`

## Support and Feedback
Feel free to [open an issue](https://github.com/D4H/api-angular/issues/new) if you have any queries or concerns, or reach out to <support@d4h.org>.

## License
Copyright (C) 2019 [D4H](https://d4htechnologies.com/)

Licensed under the [MIT](LICENSE) license.
