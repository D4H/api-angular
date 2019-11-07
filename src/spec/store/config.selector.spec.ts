import { Inject, Injectable } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

import { CLIENT_CONFIG, Config, ConfigProvider } from '../../lib/providers/config.provider';
import { Factory } from '../../lib/factories';

interface State {
  client: Config;
}

@Injectable()
class ConfigSelector implements ConfigProvider {
  readonly config$: Observable<Config>;

  constructor(private readonly store: Store<State>) {
    this.config$ = this.store.pipe(select('client'));
  }
}

@Injectable()
class ConfigConsumer {
  constructor(
    @Inject(CLIENT_CONFIG) readonly configurator: ConfigProvider
  ) {}
}

/**
 * Test an NgRx store selector for the client config per README.md.
 */

describe('NgRx Config Selector', () => {
  let config: Config;
  let consumer: ConfigConsumer;
  let selector: ConfigSelector;
  let store: MockStore<State>;

  beforeEach(() => {
    config = Factory.build('Config');

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
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(consumer).toBeTruthy();
    expect(selector).toBeTruthy();
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
