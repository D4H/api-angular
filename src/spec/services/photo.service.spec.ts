import faker from 'faker';
import { NOT_FOUND, UNAUTHORIZED, getStatusText } from 'http-status-codes';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_PHOTO_URL_REGEX, ApiUrl } from '../../lib/tools';
import { ClientTestModule } from '../client-test.module';
import { Config, routes } from '../../lib/providers';
import { Factory } from '../../lib/factories';
import { PhotoService } from '../../lib/services';

describe('PhotoService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: PhotoService;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule.forRoot(config)
      ],
      providers: [
        PhotoService
      ]
    });

    http = TestBed.get(HttpTestingController);
    sanitizer = TestBed.get(DomSanitizer);
    service = TestBed.get(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('get', () => {
    let blob: Blob;
    let path: string;
    let safeUrl: SafeUrl;
    let url: string;

    beforeEach(() => {
      blob = Factory.build<Blob>('Photo');
      path = `/${faker.random.uuid()}/image`;
      safeUrl = sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      url = ApiUrl(config, path);
    });

    it('should have get accessor', () => {
      expect(typeof service.get).toBe('function');
      expect(service.get.length).toBe(1);
    });

    it('should return a SafeUrl when given a valid URL', () => {
      service.get(path).subscribe((res: any) => {
        expect(res.hasOwnProperty('changingThisBreaksApplicationSecurity')).toBe(true);
        expect(API_PHOTO_URL_REGEX.test(res.changingThisBreaksApplicationSecurity)).toBe(true);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush(blob);
    });

    it('should return undefined when response is not a Blob', () => {
      service.get(path).subscribe((res: any) => {
        expect(res).toBe(undefined);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.event(new HttpResponse({ body: undefined }));
    });
  });

  describe('errorHandler', () => {
    let path: string;
    let url: string;

    beforeEach(() => {
      path = `/${faker.random.uuid()}/image`;
      url = ApiUrl(config, path);
    });

    it('should rescue from NOT_FOUND and return undefined', () => {
      service.get(path).subscribe((res: any) => {
        expect(res).toBe(undefined);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush(null, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });

    it('should re-throw any error outside of NOT_FOUND', () => {
      service.get(path).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(UNAUTHORIZED);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush(null, {
        status: UNAUTHORIZED,
        statusText: getStatusText(UNAUTHORIZED)
      });
    });
  });
});
