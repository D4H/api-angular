import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import { Factory, sample } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { AccountService } from '../../lib/services';
import { ApiHttpClient } from '../../lib/client';
import { ApiUrl } from '../../lib/tools';
import { ClientTestModule } from '../client-test.module';
import { routes } from '../../lib/providers';

import {
  Account,
  Membership,
  MembershipModule,
  MembershipType,
  Username
} from '../../lib/models';

describe('AccountService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        AccountService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get<AccountService>(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authenticate', () => {
    const path: string = routes.account.authenticate;
    let account: Account;
    let username: string;
    let password: string;

    beforeEach(() => {
      account = Factory.build<Account>('Account');
      password = faker.internet.password();
      username = faker.internet.userName();
    });

    it('should be a function', () => {
      expect(typeof service.authenticate).toBe('function');
    });

    it('should call http.post return an account object with correct username and password', () => {
      http.post.and.returnValue(of({ data: account }));
      result$ = hot('(a|)', { a: account });
      expect(service.authenticate(username, password)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, { username, password });
    });

    it('should call http.post return UNAUTHORIZED with an incorrect password or username', () => {
      error = { ...error, status: UNAUTHORIZED };
      http.post.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.authenticate(username, password)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, { username, password });
    });

    it('should call http.post and return BAD_REQUEST with an invalid password or username', () => {
      error = { ...error, status: BAD_REQUEST };
      password = '';
      http.post.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.authenticate(username, password)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, { username, password });
    });
  });

  describe('memberships', () => {
    const path: string = routes.account.memberships;
    let memberships: Array<Membership>;
    let type: MembershipType;

    beforeEach(() => {
      memberships = Factory.buildList<Membership>('Membership');
      type = sample<MembershipType>(MembershipType);
    });

    it('should be a function', () => {
      expect(typeof service.memberships).toBe('function');
    });

    it('should call http.get and return an array of memberships', () => {
      http.get.and.returnValue(of({ data: { documents: memberships } }));
      result$ = hot('(a|)', { a: memberships });
      expect(service.memberships()).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { list_modules: false }});
    });

    it('should pass list_modules = true', () => {
      http.get.and.returnValue(of({ data: { documents: memberships } }));
      result$ = hot('(a|)', { a: memberships });
      expect(service.memberships({ list_modules: true })).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { list_modules: true }});
    });

    it('should scope returned records to given MembershipType', () => {
      memberships = memberships.filter(membership => membership.type === type);
      http.get.and.returnValue(of({ data: { documents: memberships } }));
      result$ = hot('(a|)', { a: memberships });
      expect(service.memberships({ type })).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { list_modules: false }});
    });
  });

  describe('username', () => {
    const path: string = routes.account.username;
    let username: Username;

    beforeEach(() => {
      username = Factory.build<Username>('Username');
    });

    it('should be a function', () => {
      expect(typeof service.username).toBe('function');
    });

    it('should call http.get and return a username object', () => {
      http.get.and.returnValue(of({ data: username }));
      result$ = hot('(a|)', { a: username });
      expect(service.username(username.username)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { username: username.username }});
    });

    it('should return a username object when the server returns NOT_FOUND', () => {
      username.language = undefined;
      username.exists = false;
      http.get.and.returnValue(throwError({ ...error, status: NOT_FOUND }));
      result$ = hot('(a|)', { a: username });
      expect(service.username(username.username)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { username: username.username } });
    });

    it('should re-throw any error outside of NOT_FOUND', () => {
      error = { ...error, status: BAD_REQUEST };
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.username(username.username)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { username: username.username } });
    });
  });
});
