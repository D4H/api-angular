import faker from 'faker';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, getStatusText } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import { AccountService } from 'bindings/lib/services';
import { ApiUrl, ClientTestModule, Factory, sample } from 'bindings/testing';
import { ClientConfig, routes } from 'bindings/lib/providers';

import {
  Account,
  Membership,
  MembershipModule,
  MembershipType,
  Username
} from 'bindings/lib/models';

describe('AccountService', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('AccountService#authenticate', () => {
    const path: string = routes.account.authenticate;
    let account: Account;
    let username: string;
    let password: string;
    let url: string;

    beforeEach(() => {
      password = faker.internet.password();
      username = faker.internet.userName();
      url = ApiUrl(config, path);
    });

    it('should have #authenticate accessor', () => {
      expect(typeof service.authenticate).toBe('function');
      expect(service.authenticate.length).toBe(2);
    });

    it('should return an account object with correct username and password', () => {
      account = Factory.build<Account>('Account');

      service.authenticate(username, password)
        .subscribe((res: Account) => expect(res).toEqual(account));

      req = http.expectOne({ url, method: 'POST' });
      req.flush({ data: account });
    });

    it('should return 401 Unauthorized with an invalid password or username', () => {
      service.authenticate(username, password).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(UNAUTHORIZED);
      });

      req = http.expectOne({ url, method: 'POST' });

      req.flush({}, {
        status: UNAUTHORIZED,
        statusText: getStatusText(UNAUTHORIZED)
      });
    });

    it('should return 400 Bad Request with a password of < 3 length', () => {
      service.authenticate(username, '  ').subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'POST' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('AccountService#memberships', () => {
    const modules: MembershipModule = Factory.build<MembershipModule>('MembershipModule');
    const path: string = routes.account.memberships;
    let memberships: Array<Membership>;
    let url: string;

    it('should have #memberships accessor', () => {
      expect(typeof service.memberships).toBe('function');
      expect(service.memberships.length).toBe(1);
    });

    it('should return an array of Memberships', () => {
      memberships = Factory.buildList<Membership>('Membership', 15);
      url = ApiUrl(config, path, { list_modules: false });

      service.memberships()
        .subscribe(res => expect(res).toEqual(memberships));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: { documents: memberships } });
    });

    it('should return an array of Memberships with optional team modules', () => {
      memberships = Factory.buildList<Membership>('Membership', 15, { unit: { modules } });
      url = ApiUrl(config, path, { list_modules: true });

      service.memberships({ list_modules: true })
        .subscribe(res => expect(res).toEqual(memberships));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: { documents: memberships } });
    });

    it('should return an array of Memberships scoped to a given type', () => {
      const type: MembershipType = sample(MembershipType);

      memberships = Factory.buildList<Membership>('Membership', 15);
      url = ApiUrl(config, path, { list_modules: false });

      service.memberships({ type }).subscribe(
        res => expect(res).toEqual(memberships.filter(m => m.type === type))
      );

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: { documents: memberships } });
    });
  });

  describe('AccountService#username', () => {
    const path: string = routes.account.username;
    let url: string;
    let username: Username;

    it('should have #username accessor', () => {
      expect(typeof service.username).toBe('function');
      expect(service.username.length).toBe(1);
    });

    it('should return a Username object for the given username', () => {
      username = Factory.build<Username>('Username');
      url = ApiUrl(config, path, { username: username.username });

      service.username(username.username)
        .subscribe((res: Username) => expect(res).toEqual(username));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: username });
    });

    it('should rescue from a 404 Not Found and return a Username object', () => {
      username = Factory.build<Username>('Username', {
        exists: false,
        language: undefined
      });

      url = ApiUrl(config, path, { username: username.username });

      service.username(username.username).subscribe((res: Username) => {
        expect(res).toEqual(username);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush(username, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });
  });
});
