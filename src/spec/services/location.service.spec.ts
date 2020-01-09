import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Location } from '../../lib/models';
import { LocationService } from '../../lib/services';
import { Locations } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('LocationService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        LocationService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.locations.index;
    let locations: Array<Location>;
    let search: Locations.Search;

    beforeEach(() => {
      locations = Factory.buildList<Location>('Location');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of locations', () => {
      http.get.and.returnValue(of({ data: locations }));
      result$ = hot('(a|)', { a: locations });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.locations.show;
    let location: Location;

    beforeEach(() => {
      location = Factory.build<Location>('Location');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a location', () => {
      http.get.and.returnValue(of({ data: location }));
      result$ = hot('(a|)', { a: location });
      expect(service.show(location.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(location.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.show(location.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(location.id));
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.locations.destroy;
    let location: Location;

    beforeEach(() => {
      location = Factory.build<Location>('Location');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the location', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: location.id });
      expect(service.destroy(location.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(location.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.destroy(location.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(location.id));
    });
  });

  describe('search', () => {
    const path: string = routes.team.locations.index;
    let locations: Array<Location>;
    let query: string;
    let search: Locations.Search;

    beforeEach(() => {
      locations = Factory.buildList<Location>('Location');
      search = { limit: 5, offset: 15 };
      query = faker.random.uuid();
    });

    it('should be a function', () => {
      expect(typeof service.search).toBe('function');
    });

    it('should call http.get and return an array of locations', () => {
      http.get.and.returnValue(of({ data: locations }));
      result$ = hot('(a|)', { a: locations });
      expect(service.search(query, search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { title: query, ...search } });
    });

    it('should call http.get with {} by default for params', () => {
      http.get.and.returnValue(of({ data: locations }));
      result$ = hot('(a|)', { a: locations });
      expect(service.search(query)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { title: query } });
    });
  });
});
