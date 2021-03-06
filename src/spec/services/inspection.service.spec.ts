import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Inspection } from '../../lib/models';
import { InspectionService } from '../../lib/services';
import { Inspections, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('InspectionService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: InspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        InspectionService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(InspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.inspections.index;
    let data: Array<Inspection>;
    let page: Page;
    let search: Inspections.Query;

    beforeEach(() => {
      data = Factory.buildList<Inspection>('Inspection');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of data', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.index()).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: {} });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.inspections.show;
    let inspection: Inspection;

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a inspection', () => {
      http.get.and.returnValue(of({ data: inspection }));
      result$ = hot('(a|)', { a: inspection });
      expect(service.show(inspection.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(inspection.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(inspection.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(inspection.id));
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.inspections.update;
    let attributes: Inspections.Change;
    let inspection: Inspection;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');

      attributes = {
        all_kinds: faker.random.boolean(),
        description: faker.lorem.paragraph(),
        title: faker.lorem.sentence()
      };
    });

    it('should call http.put and return a inspection', () => {
      http.put.and.returnValue(of({ data: inspection }));
      result$ = hot('(a|)', { a: inspection });
      expect(service.update(inspection.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(inspection.id), attributes);
    });

    it('should pass empty attributes object by default', () => {
      http.put.and.returnValue(of({ data: inspection }));
      result$ = hot('(a|)', { a: inspection });
      expect(service.update(inspection.id)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(inspection.id), {});
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(inspection.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(inspection.id), attributes);
    });
  });
});
