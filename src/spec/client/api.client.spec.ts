import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiHttpClient } from '../../lib/client';
import { ApiUrl } from '../../lib/tools';
import { ClientTestModule } from '../client-test.module';
import { Config } from '../../lib/providers';

describe('ApiHttpClient', () => {
  let client: ApiHttpClient;
  let config: Config;
  let http: HttpTestingController;
  let path: string;
  let req: TestRequest;
  let url: string;

  beforeEach(() => {
    config = Factory.build('Config');

    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    client = TestBed.get(ApiHttpClient);
    path = `/${faker.random.uuid()}/${faker.random.uuid()}`;
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(client).toBeTruthy();
  });

  describe('get', () => {
    beforeEach(() => {
      client.get(path).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'GET' });
      req.flush({});
    });

    it('should have get accessor', () => {
      expect(typeof client.get).toBe('function');
    });

    it('should set full URL for request', () => {
      expect(req.request.url).toEqual(url);
    });

    it('should set x-source-* headers', () => {
      expect(req.request.headers.get('x-source-client'))
        .toEqual(config.client.name);

      expect(req.request.headers.get('x-source-version'))
        .toEqual(config.client.version);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      client.delete(path).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'DELETE' });
      req.flush({});
    });

    it('should have delete accessor', () => {
      expect(typeof client.delete).toBe('function');
    });

    it('should set full URL for request', () => {
      expect(req.request.url).toEqual(url);
    });

    it('should set x-source-* headers', () => {
      expect(req.request.headers.get('x-source-client'))
        .toEqual(config.client.name);

      expect(req.request.headers.get('x-source-version'))
        .toEqual(config.client.version);
    });
  });

  describe('put', () => {
    beforeEach(() => {
      client.put(path, {}).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'PUT' });
      req.flush({});
    });

    it('should have put accessor', () => {
      expect(typeof client.put).toBe('function');
    });

    it('should set full URL for request', () => {
      expect(req.request.url).toEqual(url);
    });

    it('should set x-source-* headers', () => {
      expect(req.request.headers.get('x-source-client'))
        .toEqual(config.client.name);

      expect(req.request.headers.get('x-source-version'))
        .toEqual(config.client.version);
    });
  });

  describe('post', () => {
    beforeEach(() => {
      client.post(path, {}).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'POST' });
      req.flush({});
    });

    it('should have post accessor', () => {
      expect(typeof client.post).toBe('function');
    });

    it('should set full URL for request', () => {
      expect(req.request.url).toEqual(url);
    });

    it('should set x-source-* headers', () => {
      expect(req.request.headers.get('x-source-client'))
        .toEqual(config.client.name);

      expect(req.request.headers.get('x-source-version'))
        .toEqual(config.client.version);
    });
  });
});
