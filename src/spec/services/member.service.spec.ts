import * as faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_PHOTO_URL_REGEX, ApiUrl } from '../utilities';
import { ClientConfig, routes } from '../../lib/providers';
import { ConfigureApiModule } from '../../test';
import { Factory } from '../factories';
import { Group, Member, OperationalStatus, StatusLabel } from '../../lib/models';
import { MemberService } from '../../lib/services';
import { Members } from '../../lib/routes';

describe('MemberService', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: MemberService;

  beforeEach(() => {
    ConfigureApiModule(TestBed, config);
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(MemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('MemberService#index', () => {
    const path: string = routes.team.members.index;
    let members: Array<Member>;
    let search: Members.Search;
    let url: string;

    beforeEach(() => {
      members = Factory.buildList<Member>('Member', 15);
    });

    it('should have #index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Members', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Member>) => expect(res).toEqual(members));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: members });
    });

    it('should accept optional search parameters and return an array of Members', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Member>) => expect(res).toEqual(members));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: members });
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

  describe('MemberService#show', () => {
    const path: (id: number | 'me') => string = routes.team.members.show;
    let member: Member;
    let url: string;

    beforeEach(() => {
      member = Factory.build<Member>('Member');
    });

    it('should have #show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Member with numeric ID', () => {
      url = ApiUrl(config, path(member.id));
      service.show(member.id).subscribe((res: Member) => expect(res).toEqual(member));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: member });
    });

    it('should return a single Member with string "me" ID', () => {
      url = ApiUrl(config, path('me'));
      service.show('me').subscribe((res: Member) => expect(res).toEqual(member));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: member });
    });

    it('should return 404 Not Found with nonexistent Member', () => {
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

  describe('MemberService#update', () => {
    const path: (id: number | 'me') => string = routes.team.members.update;
    let attributes: Members.Change;
    let member: Member;
    let updatedMember: Member;
    let url: string;

    beforeEach(() => {
      member = Factory.build<Member>('Member');
      url = ApiUrl(config, path(member.id));

      attributes = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        notes: faker.lorem.sentence()
      };

      updatedMember = {
        ...member,
        ...attributes
      };
    });

    it('should have #update accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(2);
    });

    it('should return an updated Note', () => {
      service.update(member.id, attributes)
        .subscribe((res: Member) => expect(res).toEqual(updatedMember));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedMember });
    });

    it('should return 400 Bad Request without a body', () => {
      service.update(member.id, undefined).subscribe(
        () => {},
        error => {
          expect(error.constructor).toBe(HttpErrorResponse);
          expect(error.status).toBe(BAD_REQUEST);
        }
      );

      req = http.expectOne({ url, method: 'PUT' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('MemberService#groups', () => {
    const path: (id: number | 'me') => string = routes.team.members.groups;
    let groups: Array<Group>;
    let member: Member;
    let url: string;

    beforeEach(() => {
      groups = Factory.buildList<Group>('Group', 15);
      member = Factory.build<Member>('Member');
    });

    it('should have #groups accessor', () => {
      expect(typeof service.groups).toBe('function');
      expect(service.groups.length).toBe(1);
    });

    it('should return an array of Group records with a numeric ID', () => {
      url = ApiUrl(config, path(member.id));

      service.groups(member.id)
        .subscribe((res: Array<Group>) => expect(res).toEqual(groups));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: groups });
    });

    it('should return an array of Group records with a string "me" ID', () => {
      url = ApiUrl(config, path('me'));

      service.groups('me')
        .subscribe((res: Array<Group>) => expect(res).toEqual(groups));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: groups });
    });


    it('should return 404 Not Found with nonexistent Member', () => {
      url = ApiUrl(config, path(Number.MAX_SAFE_INTEGER));

      service.groups(Number.MAX_SAFE_INTEGER).subscribe(() => {}, error => {
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

  describe('MemberService#image', () => {
    let blob: Blob;
    let path: string;
    let safeUrl: SafeUrl;
    let sanitizer: DomSanitizer;
    let url: string;
    let memberId: number;

    beforeEach(() => {
      blob = Factory.build<Blob>('Photo');
      memberId = faker.random.number();
      path = routes.team.members.image(memberId);
      sanitizer = TestBed.get(DomSanitizer);
      safeUrl = sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      url = ApiUrl(config, path);
    });

    it('should have #image accessor', () => {
      expect(typeof service.image).toBe('function');
      expect(service.image.length).toBe(2);
    });

    it('should return a SafeUrl when given a valid URL', () => {
      service.image(memberId).subscribe((res: any) => {
        expect(res.hasOwnProperty('changingThisBreaksApplicationSecurity')).toBe(true);
        expect(API_PHOTO_URL_REGEX.test(res.changingThisBreaksApplicationSecurity)).toBe(true);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush(blob);
    });

    it('should return 404 Not Found with nonexistent Member ID', () => {
      url = ApiUrl(config, routes.team.members.image(Number.MAX_SAFE_INTEGER));

      service.image(Number.MAX_SAFE_INTEGER).subscribe(() => {}, error => {
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

  describe('MemberService#labels', () => {
    const path: string = routes.team.members.labels;
    let data: Members.LabelData;
    let url: string;

    it('should have #labels accessor', () => {
      expect(typeof service.labels).toBe('function');
      expect(service.labels.length).toBe(0);
    });

    beforeEach(() => {
      data = [
        Factory.build<StatusLabel & { type: OperationalStatus.Operational }>
          ('StatusLabel', { type: OperationalStatus.Operational }),
        Factory.build<StatusLabel & { type: OperationalStatus.NonOperational }>
          ('StatusLabel', { type: OperationalStatus.NonOperational }),
        Factory.build<StatusLabel & { type: OperationalStatus.Retired }>
          ('StatusLabel', { type: OperationalStatus.Retired }),
        Factory.build<StatusLabel & { type: OperationalStatus.Deleted }>
          ('StatusLabel', { type: OperationalStatus.Deleted })
      ];
    });

    it('should return a LabelData structure', () => {
      url = ApiUrl(config, path);

      service.labels()
        .subscribe((res: Members.LabelData) => expect(res).toEqual(data));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data });
    });
  });
});
