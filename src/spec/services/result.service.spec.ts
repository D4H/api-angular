import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Inspection, Result } from '../../lib/models';
import { InspectionResults } from '../../lib/api';
import { ResultService } from '../../lib/services';
import { routes } from '../../lib/providers';

describe('ResultService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: ResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        ResultService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(ResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: (id: number) => string = routes.team.results.index;
    let inspection: Inspection;
    let results: Array<Result>;
    let search: InspectionResults.Search;

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');
      results = Factory.buildList<Result>('Result');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of results', () => {
      http.get.and.returnValue(of({ data: results }));
      result$ = hot('(a|)', { a: results });
      expect(service.index(inspection.id, search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(inspection.id), { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.index(inspection.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(inspection.id), { params: {} });
    });
  });

  describe('show', () => {
    const path: (inspectionId: number, id: number) => string = routes.team.results.show;
    let inspection: Inspection;
    let result: Result;

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');
      result = Factory.build<Result>('Result');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a result', () => {
      http.get.and.returnValue(of({ data: result }));
      result$ = hot('(a|)', { a: result });
      expect(service.show(inspection.id, result.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(inspection.id, result.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.show(inspection.id, result.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(inspection.id, result.id));
    });
  });

  describe('update', () => {
    const path: (inspectionId: number, id: number) => string = routes.team.results.update;
    let attributes: InspectionResults.Change;
    let inspection: Inspection;
    let result: Result;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');
      result = Factory.build<Result>('Result');

      attributes = {
        date_completed: result.date_completed,
        description: result.description
      };
    });

    it('should call http.put and return a result', () => {
      http.put.and.returnValue(of({ data: result }));
      result$ = hot('(a|)', { a: result });
      expect(service.update(inspection.id, result.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(inspection.id, result.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.update(inspection.id, result.id)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(inspection.id, result.id), {});
    });
  });
});
