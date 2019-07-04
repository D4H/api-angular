import faker from 'faker';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { OK } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import { ApiHttpClient } from 'bindings/lib/client';
import { ApiUrl, ClientTestModule, Factory } from 'bindings/testing';
import { ClientConfig, Region, TokenType, Version } from 'bindings/lib/providers';

// FIXME: Enable this!
xdescribe('ApiHttpClient', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let client: ApiHttpClient;
  let http: HttpTestingController;
  let path: string;
  let req: TestRequest;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    client = TestBed.get(ApiHttpClient);
    path = `/${faker.random.objectElement()}/${faker.random.objectElement()}`;
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(client).toBeTruthy();
  });

  describe('ApiHttpClient#get', () => {
    beforeEach(() => {
      client.get(path).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'GET' });
      req.flush({});
    });

    it('should have #get accessor', () => {
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

  describe('ApiHttpClient#delete', () => {
    beforeEach(() => {
      client.delete(path).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'DELETE' });
      req.flush({});
    });

    it('should have #delete accessor', () => {
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

  describe('ApiHttpClient#put', () => {
    beforeEach(() => {
      client.put(path, {}).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'PUT' });
      req.flush({});
    });

    it('should have #put accessor', () => {
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

  describe('ApiHttpClient#post', () => {
    beforeEach(() => {
      client.post(path, {}).subscribe(() => {});
      url = ApiUrl(config, path);
      req = http.expectOne({ url, method: 'POST' });
      req.flush({});
    });

    it('should have #post accessor', () => {
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
