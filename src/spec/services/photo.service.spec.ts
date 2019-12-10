import faker from 'faker';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NOT_FOUND, UNAUTHORIZED, getStatusText } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Config, routes } from '../../lib/providers';
import { PhotoService } from '../../lib/services';

describe('PhotoService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let sanitizer: any;
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        PhotoService,
        {
          provide: DomSanitizer,
          useValue: jasmine.createSpyObj('http', ['bypassSecurityTrustResourceUrl'])
        },
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
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

    beforeEach(() => {
      blob = Factory.build<Blob>('Blob');
      safeUrl = Factory.build<SafeUrl>('SafeUrl', blob);
      path = `/${faker.random.uuid()}/image`;
    });

    it('should be a function', () => {
      expect(typeof service.get).toBe('function');
    });

    it('should call http.get and return a SafeUrl', () => {
      http.get.and.returnValue(of(blob));
      sanitizer.bypassSecurityTrustResourceUrl.and.returnValue(safeUrl);
      result$ = hot('(a|)', { a: safeUrl });
      expect(service.get(path)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { responseType: 'blob' });
    });

    it('should return null when response is not a Blob', () => {
      http.get.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: null });
      expect(service.get(path)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { responseType: 'blob' });
    });

    it('should return null when error response is NOT_FOUND', () => {
      error = { ...error, status: NOT_FOUND };
      http.get.and.returnValue(throwError(error));
      result$ = hot('(a|)', { a: null });
      expect(service.get(path)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { responseType: 'blob' });
    });

    it('should throw an error with any other invalid response', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.get(path)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { responseType: 'blob' });
    });
  });
});
