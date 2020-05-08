import { Factory } from '@d4h/testing';
import { Inject, Injectable, Provider } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, isObservable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';

import { CLIENT_CONFIG, Config } from '../../lib/providers/config.provider';

/**
 * NgRx Client Config
 * =============================================================================
 * Test an NgRx store selector for the client config per README.md.
 */

interface State {
  config: Config;
}

@Injectable()
class ConfigConsumer {
  constructor(
    @Inject(CLIENT_CONFIG) readonly config$: Observable<Config>
  ) {}
}

describe('NgRx Client Config Selector', () => {
  let config: Config;
  let configProvider: Provider;
  let consumer: ConfigConsumer;
  let result$: Observable<any>;
  let store: MockStore<State>;

  beforeEach(() => {
    config = Factory.build('Config');

    configProvider = {
      provide: CLIENT_CONFIG,
      deps: [Store],
      useFactory(state: Store<State>): Observable<Config> {
        return state.pipe(select('config'));
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ConfigConsumer,
        configProvider,
        provideMockStore({ initialState: { config } })
      ]
    });

    consumer = TestBed.get(ConfigConsumer);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(consumer).toBeTruthy();
  });

  it('should have config$', () => {
    expect(isObservable(consumer.config$)).toBe(true);
  });

  it('should provide observable config', () => {
    result$ = hot('(a)', { a: config });
    expect(consumer.config$).toBeObservable(result$);
  });
});
