import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import * as API from '../../lib/resources';
import { Activity } from '../../lib/models';
import { ActivityService } from '../../lib/services';
import { ApiUrl, ClientTestModule, Factory } from '../../testing';
import { Config, routes } from '../../lib/providers';

describe('ActivityService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(ActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.activities.index;
    let search: API.Activities.Search;
    let activities: Array<Activity>;
    let url: string;

    beforeEach(() => {
      activities = Factory.buildList<Activity>('Activity', 7);
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Activities', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Activity>) => expect(res).toEqual(activities));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: activities });
    });

    it('should accept optional search parameters and return an array of Activities', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Activity>) => expect(res).toEqual(activities));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: activities });
    });

    it('should return 400 Bad Request with an invalid search', () => {
      search = { limit: 'moo' } as any;
      url = ApiUrl(config, path, search);

      service.index(search).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.activities.show;
    let activity: Activity;
    let url: string;

    beforeEach(() => {
      activity = Factory.build<Activity>('Activity');
      url = ApiUrl(config, path(activity.id));
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Activity', () => {
      service.show(activity.id).subscribe((res: Activity) => expect(res).toEqual(activity));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: activity });
    });

    it('should return 404 Not Found with nonexistent Activity', () => {
      url = ApiUrl(config, path(Number.MAX_SAFE_INTEGER));

      service.show(Number.MAX_SAFE_INTEGER).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(NOT_FOUND);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });
  });
});
