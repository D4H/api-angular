import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Group, Member, OperationalStatus, StatusLabel } from '../../lib/models';
import { MemberService, PhotoService } from '../../lib/services';
import { Members, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('MemberService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let photoService: any;
  let result$: Observable<any>;
  let service: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        MemberService,
        {
          provide: PhotoService,
          useValue: jasmine.createSpyObj('photoService', ['get'])
        },
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get<MemberService>(MemberService);
    photoService = TestBed.get<PhotoService>(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.members.index;
    let data: Array<Member>;
    let page: Page;
    let search: Members.Query;

    beforeEach(() => {
      data = Factory.buildList('Member');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of members', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.index()).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: {} });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.members.show;
    let member: Member;

    beforeEach(() => {
      member = Factory.build<Member>('Member');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a member', () => {
      http.get.and.returnValue(of({ data: member }));
      result$ = hot('(a|)', { a: member });
      expect(service.show(member.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(member.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(member.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(member.id));
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.members.update;
    let attributes: Partial<Member>;
    let member: Member;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      member = Factory.build<Member>('Member');

      attributes = {
        email: member.email,
        name: member.name,
        ref: member.ref
      };
    });

    it('should call http.put and return a member', () => {
      http.put.and.returnValue(of({ data: member }));
      result$ = hot('(a|)', { a: member });
      expect(service.update(member.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(member.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(member.id)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(member.id), {});
    });
  });

  describe('groups', () => {
    const path: (id: number) => string = routes.team.members.groups;
    let groups: Array<Group>;
    let member: Member;

    beforeEach(() => {
      groups = Factory.buildList<Group>('Group');
      member = Factory.build<Member>('Member');
    });

    it('should be a function', () => {
      expect(typeof service.groups).toBe('function');
    });

    it('should call http.get and return an array of groups', () => {
      http.get.and.returnValue(of({ data: groups }));
      result$ = hot('(a|)', { a: groups });
      expect(service.groups(member.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(member.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.groups(member.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(member.id));
    });
  });

  describe('image', () => {
    const path: (id: number) => string = routes.team.members.image;
    let member: Member;
    let image: SafeUrl;

    beforeEach(() => {
      member = Factory.build<Member>('Member');
      image = Factory.build<SafeUrl>('SafeUrl');
    });

    it('should be a function', () => {
      expect(typeof service.image).toBe('function');
    });

    it('should call photoService.get and return a SafeUrl', () => {
      photoService.get.and.returnValue(of(image));
      result$ = hot('(a|)', { a: image });
      expect(service.image(member.id)).toBeObservable(result$);
      expect(photoService.get).toHaveBeenCalledWith(path(member.id), { params: {} });
    });

    it('should call photoService.get and return undefined when image does not exist', () => {
      error = { ...error, status: NOT_FOUND };
      photoService.get.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: undefined });
      expect(service.image(member.id)).toBeObservable(result$);
      expect(photoService.get).toHaveBeenCalledWith(path(member.id), { params: {} });
    });
  });

  describe('labels', () => {
    const path: string = routes.team.members.labels;
    let data: Members.LabelData;
    let member: Member;

    beforeEach(() => {
      member = Factory.build<Member>('Member');

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

    it('should be a function', () => {
      expect(typeof service.labels).toBe('function');
    });

    it('should call http.get and return an array of labels', () => {
      http.get.and.returnValue(of({ data }));
      result$ = hot('(a|)', { a: data });
      expect(service.labels()).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path);
    });
  });

  describe('search', () => {
    const path: string = routes.team.members.index;
    let data: Array<Member>;
    let page: Page;
    let query: string;
    let search: Members.Query;

    beforeEach(() => {
      data = Factory.buildList('Member');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
      query = faker.random.uuid();
    });

    it('should be a function', () => {
      expect(typeof service.search).toBe('function');
    });

    it('should call http.get and return an array of members', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.search(query, search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { name: query, ...search } });
    });

    it('should call http.get with {} by default for params', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
      expect(service.search(query)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { name: query } });
    });
  });
});
