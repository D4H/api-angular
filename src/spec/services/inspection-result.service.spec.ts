import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Inspection, Result } from '../../lib/models';
import { InspectionResults, Page } from '../../lib/api';
import { InspectionResultService } from '../../lib/services';
import { routes } from '../../lib/providers';

describe('InspectionResultService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: InspectionResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        InspectionResultService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'put'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(InspectionResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.results.index;
    let data: Array<Result>;
    let search: InspectionResults.Search;
    let page: Page;

    beforeEach(() => {
      data = Factory.buildList<Result>('Result');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of results', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.index()).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: {} });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.results.show;
    let result: Result;

    beforeEach(() => {
      result = Factory.build<Result>('Result');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a result', () => {
      http.get.and.returnValue(of({ data: result }));
      result$ = hot('(a|)', { a: result });
      expect(service.show(result.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(result.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(result.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(result.id));
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.results.update;
    let attributes: InspectionResults.Change;
    let result: Result;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      result = Factory.build<Result>('Result');

      attributes = {
        date_completed: result.date_completed,
        description: result.description
      };
    });

    it('should call http.put and return a result', () => {
      http.put.and.returnValue(of({ data: result }));
      result$ = hot('(a|)', { a: result });
      expect(service.update(result.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(result.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(result.id)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(result.id), {});
    });
  });
});
