import * as faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiUrl } from '../utilities';
import { ClientConfig, routes } from '../../lib/providers';
import { ConfigureApiModule } from '../../test';
import { Factory } from '../factories';
import { Role } from '../../lib/models';
import { RoleService } from '../../lib/services';
import { Roles } from '../../lib/routes';

describe('RoleService', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: RoleService;

  beforeEach(() => {
    ConfigureApiModule(TestBed, config);
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('RoleService#index', () => {
    const path: string = routes.team.roles.index;
    let search: Roles.Search;
    let roles: Array<Role>;
    let url: string;

    beforeEach(() => {
      roles = Factory.buildList<Role>('Role', 7);
    });

    it('should have #index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Roles', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Role>) => expect(res).toEqual(roles));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: roles });
    });

    it('should accept optional search parameters and return an array of Roles', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Role>) => expect(res).toEqual(roles));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: roles });
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

  describe('RoleService#show', () => {
    const path: (id: number) => string = routes.team.roles.show;
    let role: Role;
    let url: string;

    beforeEach(() => {
      role = Factory.build<Role>('Role');
      url = ApiUrl(config, path(role.id));
    });

    it('should have #show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Role', () => {
      service.show(role.id).subscribe((res: Role) => expect(res).toEqual(role));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: role });
    });

    it('should return 404 Not Found with nonexistent Role', () => {
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
