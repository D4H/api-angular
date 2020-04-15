import faker from 'faker';
import { Factory, sample } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { EntityType, SearchResult } from '../../lib/models';
import { SearchService } from '../../lib/services';
import { Searches, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('SearchService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        SearchService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('search', () => {
    const path: string = routes.team.search;
    let data: Array<SearchResult>;
    let page: Page;
    let query: Searches.Query;

    beforeEach(() => {
      data = Factory.buildList<SearchResult>('SearchResult');
      page = Factory.build('Page');

      query = {
        limit: 5,
        offset: 15,
        entity_type: sample(EntityType),
        query: faker.random.uuid()
      };
    });

    it('should be a function', () => {
      expect(typeof service.search).toBe('function');
    });

    it('should call http.get and return an array of searchs', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.search(query)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: query });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.search(query)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: query });
    });
  });
});
