import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  API_PHOTO_URL_REGEX,
  ApiUrl,
  ClientTestModule,
  Factory
} from '../../testing';

import { Config, routes } from '../../lib/providers';
import { InvalidPhotoUrlError, PhotoService } from '../../lib/services';
import { Membership } from '../../lib/models';

describe('PhotoService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: PhotoService;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
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

    it('should throw an error when given an invalid URL', () => {
      url = `/${faker.random.uuid()}/${faker.lorem.word()}`;

      expect(() => service.get(url))
        .toThrow(new InvalidPhotoUrlError(url));
    });
  });

  describe('membership', () => {
    let blob: Blob;
    let membership: Membership;
    let path: string;
    let url: string;
    let version: string;

    beforeEach(() => {
      blob = Factory.build<Blob>('Photo');
      membership = Factory.build<Membership>('Membership');
      path = routes.team.image;
      version = new Date(membership.unit.id * 1000000).toISOString();
      url = ApiUrl(config, path, { version });
    });

    it('should have membership accessor', () => {
      expect(typeof service.membership).toBe('function');
      expect(service.membership.length).toBe(2);
    });

    it('should return a SafeUrl when given a valid URL and Membership', () => {
      service.membership(path, membership).subscribe((res: any) => {
        expect(res.hasOwnProperty('changingThisBreaksApplicationSecurity')).toBe(true);
        expect(API_PHOTO_URL_REGEX.test(res.changingThisBreaksApplicationSecurity)).toBe(true);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush(blob);

      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${membership.token}`);
    });

    it('should accept overriding version parameter', () => {
      const date: Date = new Date();
      url = ApiUrl(config, path, { version: date.toISOString() });

      service.membership(path, membership, { version: date }).subscribe((res: any) => {
        expect(res.hasOwnProperty('changingThisBreaksApplicationSecurity')).toBe(true);
        expect(API_PHOTO_URL_REGEX.test(res.changingThisBreaksApplicationSecurity)).toBe(true);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush(blob);
    });
  });
});
