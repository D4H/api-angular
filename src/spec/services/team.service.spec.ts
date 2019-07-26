import faker from 'faker';
import { BAD_GATEWAY, BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  API_PHOTO_URL_REGEX,
  ApiUrl,
  ClientTestModule,
  Factory
} from '../../testing';

import { ClientConfig, routes } from '../../lib/providers';
import { Membership, Setting, SettingData, Team } from '../../lib/models';
import { TeamService } from '../../lib/services';

describe('TeamService', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(TeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('TeamService#show', () => {
    let membership: Membership;
    let team: Team;
    let url: string;

    beforeEach(() => {
      membership = Factory.build<Membership>('Membership');

      team = Factory.build<Team>('Team', {
        id: membership.unit.id,
        organisation_id: membership.organisation.id,
        title: membership.unit.name
      });

      url = ApiUrl(config, routes.team.show(membership.unit.id));
    });

    it('should have #show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Team', () => {
      service.show(membership).subscribe((res: Team) => expect(res).toEqual(team));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: team });
      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${membership.token}`);
    });

    it('should return 404 Not Found with nonexistent membership', () => {
      service.show(membership).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(NOT_FOUND);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });

    // This is a fairly annoying error in practice-the request blackholes.
    it('should return 502 Proxy Error when bearer token does not match membership ID', () => {
      const path = `/${config.version}/${routes.team.show(membership.unit.id)}`;
      const response = Factory.build<string>('ProxyError', { path });

      service.show(membership).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.error).toEqual(response);
        expect(error.status).toBe(BAD_GATEWAY);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush(response, {
        status: BAD_GATEWAY,
        statusText: getStatusText(BAD_GATEWAY)
      });
    });
  });

  describe('TeamService#image', () => {
    let blob: Blob;
    let membership: Membership;
    let safeUrl: SafeUrl;
    let sanitizer: DomSanitizer;
    let url: string;
    let version: string;

    beforeEach(() => {
      blob = Factory.build<Blob>('Photo');
      membership = Factory.build<Membership>('Membership');
      sanitizer = TestBed.get(DomSanitizer);
      safeUrl = sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      version = new Date(membership.unit.id * 1000000).toISOString();
      url = ApiUrl(config, routes.team.image, { version });
    });

    it('should have #image accessor', () => {
      expect(typeof service.image).toBe('function');
      expect(service.image.length).toBe(1);
    });

    it('should return a SafeUrl when given a Membership', () => {
      service.image(membership).subscribe((res: any) => {
        expect(res.hasOwnProperty('changingThisBreaksApplicationSecurity')).toBe(true);
        expect(API_PHOTO_URL_REGEX.test(res.changingThisBreaksApplicationSecurity)).toBe(true);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush(blob);

      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${membership.token}`);
    });

    it('should return 404 Not Found with nonexistent Membership', () => {
      service.image(membership).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(NOT_FOUND);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush(blob, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });
  });

  describe('TeamService#settings', () => {
    let data: SettingData;
    let membership: Membership;
    let setting: Setting;
    let url: string;

    beforeEach(() => {
      membership = Factory.build<Membership>('Membership');
      setting = 'MODULE_LOST_BEHAVIOUR';

      data = {
        module_name: setting,
        value: faker.random.boolean()
      };
    });

    it('should have #settings accessor', () => {
      expect(typeof service.settings).toBe('function');
      expect(service.settings.length).toBe(2);
    });

    it('should return information about a valid setting parameter', () => {
      url = ApiUrl(config, routes.team.settings, { setting });
      service.settings(membership, setting).subscribe(res => expect(res).toEqual(data));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data });
      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${membership.token}`);
    });

    it('should return 400 Not Found with a nonexistent setting parameter', () => {
      setting = 'MODULE_PONIES_GO_NEIGH' as Setting;
      url = ApiUrl(config, routes.team.settings, { setting });

      service.settings(membership, setting).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(NOT_FOUND);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });

    it('should return 400 Bad Request with no setting parameter', () => {
      url = ApiUrl(config, routes.team.settings, { setting: undefined });

      service.settings(membership, undefined).subscribe(() => {}, error => {
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
});
