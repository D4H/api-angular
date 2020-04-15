import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Category } from '../../lib/models';
import { CategoryService } from '../../lib/services';
import { Categories, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('CategoryService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        CategoryService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.categories.index;
    let data: Array<Category>;
    let page: Page;
    let search: Categories.Query;

    beforeEach(() => {
      data = Factory.buildList('Category');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of categories', () => {
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
    const path: (id: number) => string = routes.team.categories.show;
    let category: Category;

    beforeEach(() => {
      category = Factory.build<Category>('Category');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a category', () => {
      http.get.and.returnValue(of({ data: category }));
      result$ = hot('(a|)', { a: category });
      expect(service.show(category.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(category.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(category.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(category.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.categories.index;
    let attributes: Categories.New;
    let category: Category;

    beforeEach(() => {
      category = Factory.build<Category>('Category');

      attributes = {
        title: faker.random.uuid()
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a category', () => {
      http.post.and.returnValue(of({ data: category }));
      result$ = hot('(a|)', { a: category });
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
    const path: (id: number) => string = routes.team.categories.update;
    let attributes: Categories.Change;
    let category: Category;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      category = Factory.build<Category>('Category');

      attributes = {
        title: faker.random.uuid()
      };
    });

    it('should call http.put and return a category', () => {
      http.put.and.returnValue(of({ data: category }));
      result$ = hot('(a|)', { a: category });
      expect(service.update(category.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(category.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(category.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(category.id), attributes);
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.categories.destroy;
    let category: Category;

    beforeEach(() => {
      category = Factory.build<Category>('Category');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the category', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: category.id });
      expect(service.destroy(category.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(category.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.destroy(category.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(category.id));
    });
  });
});
