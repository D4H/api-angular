import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { Activities } from '../../lib/api';
import { Activity } from '../../lib/models';
import { ActivityService } from '../../lib/services';
import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Factory } from '../../lib/factories';
import { routes } from '../../lib/providers';

describe('ActivityService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        ActivityService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(ActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.activities.index;
    let activities: Array<Activity>;
    let search: Activities.Search;

    beforeEach(() => {
      activities = Factory.buildList<Activity>('Activity');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of activities', () => {
      http.get.and.returnValue(of({ data: activities }));
      result$ = hot('(a|)', { a: activities });
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
    const path: (id: number) => string = routes.team.activities.show;
    let activity: Activity;

    beforeEach(() => {
      activity = Factory.build<Activity>('Activity');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return an activity', () => {
      http.get.and.returnValue(of({ data: activity }));
      result$ = hot('(a|)', { a: activity });
      expect(service.show(activity.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(activity.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.show(activity.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(activity.id));
    });
  });
});
