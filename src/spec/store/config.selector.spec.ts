import faker from 'faker';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

import { CLIENT_CONFIG, ClientConfig, ConfigProvider } from '../../lib/providers';
import { Factory } from '../../testing';

interface State {
  client: ClientConfig;
}

class ConfigSelector implements ConfigProvider {
  readonly config$: Observable<ClientConfig>;

  constructor(private readonly store: Store<State>) {
    this.config$ = this.store.pipe(select('client'));
  }
}

class ConfigConsumer {
  constructor(
    @Inject(CLIENT_CONFIG) readonly configurator: ConfigProvider
  ) {}
}

/**
 * Test an NgRx store selector for the client config per README.md.
 */

describe('NgRx Config Selector', () => {
  let config: ClientConfig;
  let consumer: ConfigConsumer;
  let selector: ConfigSelector;
  let store: MockStore<State>;

  beforeEach(() => {
    config = Factory.build('ClientConfig');

    TestBed.configureTestingModule({
      providers: [
        ConfigConsumer,
        ConfigSelector,
        provideMockStore({ initialState: { client: config } }),
        { provide: CLIENT_CONFIG, useClass: ConfigSelector }
      ]
    });

    consumer = TestBed.get(ConfigConsumer);
    selector = TestBed.get(ConfigSelector);
    store = TestBed.get<Store<State>>(Store);
  });

  describe('ConfigSelector', () => {
    it('should should instantiate ConfigSelector', () => {
      expect(selector).toBeTruthy();
      expect(typeof selector.config$).toBe('object');
    });

    it('should yield configuration in state', done => {
      selector.config$.subscribe(stateConfig => {
        expect(stateConfig).toEqual(config);
        done();
      });
    });
  });

  describe('ConfigConsumer', () => {
    it('should should instantiate ConfigConsumer', () => {
      expect(consumer).toBeTruthy();
      expect(typeof consumer.configurator).toBe('object');
      expect(typeof consumer.configurator.config$).toBe('object');
    });

    it('should use injected configuration selector', done => {
      consumer.configurator.config$.subscribe(consumerConfig => {
        expect(consumerConfig).toEqual(config);
        done();
      });
    });
  });
});