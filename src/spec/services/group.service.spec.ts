import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import * as API from '../../lib/resources';
import { ApiUrl, ClientTestModule, Factory } from '../../testing';
import { Config, routes } from '../../lib/providers';
import { Group } from '../../lib/models';
import { GroupService } from '../../lib/services';

describe('GroupService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.groups.index;
    let search: API.Groups.Search;
    let groups: Array<Group>;
    let url: string;

    beforeEach(() => {
      groups = Factory.buildList<Group>('Group', 7);
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Groups', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Group>) => expect(res).toEqual(groups));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: groups });
    });

    it('should accept optional search parameters and return an array of Groups', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Group>) => expect(res).toEqual(groups));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: groups });
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
    const path: (id: number) => string = routes.team.groups.show;
    let group: Group;
    let url: string;

    beforeEach(() => {
      group = Factory.build<Group>('Group');
      url = ApiUrl(config, path(group.id));
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Group', () => {
      service.show(group.id).subscribe((res: Group) => expect(res).toEqual(group));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: group });
    });

    it('should return 404 Not Found with nonexistent Group', () => {
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
