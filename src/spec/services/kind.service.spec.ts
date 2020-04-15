import faker from 'faker';
import { Factory, sample } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Kind, KindType } from '../../lib/models';
import { KindService } from '../../lib/services';
import { Kinds, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('KindService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: KindService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        KindService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(KindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.kinds.index;
    let data: Array<Kind>;
    let page: Page;
    let search: Kinds.Query;

    beforeEach(() => {
      data = Factory.buildList('Kind');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of kinds', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.kinds.show;
    let kind: Kind;

    beforeEach(() => {
      kind = Factory.build<Kind>('Kind');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a kind', () => {
      http.get.and.returnValue(of({ data: kind }));
      result$ = hot('(a|)', { a: kind });
      expect(service.show(kind.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(kind.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(kind.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(kind.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.kinds.index;
    let attributes: Kinds.New;
    let kind: Kind;

    beforeEach(() => {
      kind = Factory.build<Kind>('Kind');

      attributes = {
        category_id: faker.random.number(),
        title: faker.random.uuid(),
        type: sample(KindType)
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a kind', () => {
      http.post.and.returnValue(of({ data: kind }));
      result$ = hot('(a|)', { a: kind });
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.post.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.kinds.update;
    let attributes: Kinds.Change;
    let kind: Kind;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      kind = Factory.build<Kind>('Kind');

      attributes = {
        title: faker.random.uuid()
      };
    });

    it('should call http.put and return a kind', () => {
      http.put.and.returnValue(of({ data: kind }));
      result$ = hot('(a|)', { a: kind });
      expect(service.update(kind.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(kind.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(kind.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(kind.id), attributes);
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.kinds.destroy;
    let kind: Kind;

    beforeEach(() => {
      kind = Factory.build<Kind>('Kind');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the kind', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: kind.id });
      expect(service.destroy(kind.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(kind.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.destroy(kind.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(kind.id));
    });
  });
});
