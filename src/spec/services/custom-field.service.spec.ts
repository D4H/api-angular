import faker from 'faker';
import { EntityTypes, Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { CustomField } from '../../lib/models';
import { CustomFieldService } from '../../lib/services';
import { CustomFields, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('CustomFieldService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: CustomFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        CustomFieldService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(CustomFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.customFields.index;
    let data: Array<CustomField>;
    let page: Page;
    let search: CustomFields.Query;

    beforeEach(() => {
      data = Factory.buildList('CustomField');
      page = Factory.build('Page');
      search = { limit: 7, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of customFields', () => {
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
    const path: (id: number) => string = routes.team.customFields.show;
    let customField: CustomField;

    beforeEach(() => {
      customField = Factory.build<CustomField>('CustomField');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a customField', () => {
      http.get.and.returnValue(of({ data: customField }));
      result$ = hot('(a|)', { a: customField });
      expect(service.show(customField.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(customField.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(customField.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(customField.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.customFields.index;
    let attributes: CustomFields.New;
    let customField: CustomField;

    beforeEach(() => {
      customField = Factory.build<CustomField>('CustomField');

      attributes = {
        entity_type: faker.random.arrayElement(EntityTypes),
        title: faker.lorem.words()
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a customField', () => {
      http.post.and.returnValue(of({ data: customField }));
      result$ = hot('(a|)', { a: customField });
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
    const path: (id: number) => string = routes.team.customFields.update;
    let attributes: CustomFields.Change;
    let customField: CustomField;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      customField = Factory.build<CustomField>('CustomField');

      attributes = {
        title: faker.lorem.words()
      };
    });

    it('should call http.put and return a customField', () => {
      http.put.and.returnValue(of({ data: customField }));
      result$ = hot('(a|)', { a: customField });
      expect(service.update(customField.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(customField.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(customField.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(customField.id), attributes);
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.customFields.destroy;
    let customField: CustomField;

    beforeEach(() => {
      customField = Factory.build<CustomField>('CustomField');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the customField', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: customField.id });
      expect(service.destroy(customField.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(customField.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.destroy(customField.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(customField.id));
    });
  });
});
