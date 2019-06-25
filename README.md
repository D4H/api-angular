[![Codeship Status for D4H/api-angular](https://app.codeship.com/projects/8ec182c0-643f-0137-757e-1a7608ff9ea0/status?branch=master)](https://app.codeship.com/projects/344846)
![npm](https://img.shields.io/npm/v/@d4h/angular.svg)

# D4H Angular API Bindings
Bindings is an Angular 7+ client for the [D4H](https://d4htechnologies.com/) v2 [API](https://api.d4h.org/v2/documentation). It offers:

1. Model interfaces, e.g. `Member`, `Attendance`.
2. Object services: `MemberService`, `AttendanceSerivice`.
3. Route and fixture factories for D4H endpoints and business objects.

## Installation

`npm install --save @d4h/angular`

## Configuration
Binding accepts a configuration which can either be static or yielded by an [observable](http://reactivex.io/).

### API Regions
Bindings supports all D4H API regions. Please contact <support@d4h.org> if you have questions about which is the correct data region for you to use.

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

### Format
Injected configurations are evaluated when the client makes an API request. This permits for dynamic applications where the account or team membership tokens can change in the course of use.

```typescript
interface ClientConfig {
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
Simply import `ClientModule` from the package and call `ClientModule.forRoot` with a configuration. Configuration is wrapped in a `ConfigProvider` object that yields the configuration as an observable.

```typescript
import { CLIENT_CONFIG, ClientModule, ConfigProvider, Region } from '@4h/angular';

const clientConfig: ConfigProvider = {
  config$: of({
    region: Region.Staging,

    client: {
      name: 'Minas Tirith Siege Disaster Response',
      version: '3.0.19'
    },

    tokens: {
      account: 'YdRM8Tz78tIfJ3jqhyzz',
      team: 'LKYW5USNLWAwyqy5VNcA'
    }
  })
};

@NgModule({
  imports: [
    ClientModule.forRoot(
      { provide: CLIENT_CONFIG, useValue: clientConfig }
    )
  ]
})
export class AppModule {}
```

### NgRX Store Selector Injection
D4H Angular applications rely on [NgRx](https://ngrx.io/) for internal state management. Store states are a singleton class instance-selectors only work while instantiated. With some slight changes it is quite possible to inject a selected configuration:

```typescript
import { CLIENT_CONFIG, ClientModule, ConfigProvider } from '@4h/angular';
import { selectConfig } from 'my/store/config/selector';

@Injectable({ providedIn: 'root' })
export class ConfigurationSelector implements ConfigProvider {
  readonly config$: Observable<ClientConfig>;

  constructor(private readonly store: Store<AppState>) {
    this.config$ = this.store.select(selectConfig);
  }
}

@NgModule({
  imports: [
    ClientModule.forRoot(
      { provide: CLIENT_CONFIG, useClass: ConfigurationSelector }
    )
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
Feel free to [open an issue](https://github.com/D4H/api-angular/issues/new), email <support@d4h.org> or tweet [@d4h](https://twitter.com/d4h/).

## License
Copyright (C) 2019 [D4H](https://d4htechnologies.com/)

Licensed under the [MIT](LICENSE) license.
