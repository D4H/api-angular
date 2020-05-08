import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';

import { API_ROUTES, RouteConfig } from '../providers';
import { Account, Membership, Username } from '../models';
import { Accounts } from '../api';
import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';

@Injectable({ providedIn: ClientModule })
export class AccountService {
  constructor(
    @Inject(API_ROUTES) private readonly routes: RouteConfig,
    private readonly http: ApiHttpClient
  ) {}

  authenticate(username: string, password: string): Observable<Account> {
    const route: string = this.routes.account.authenticate;
    const payload: any = { username, password };

    return this.http.post<Accounts.Authenticate>(route, payload).pipe(
      pluck('data')
    );
  }

  memberships(query: Accounts.Query = {}): Observable<Array<Membership>> {
    const route: string = this.routes.account.memberships;
    const payload: any = { params: { list_modules: Boolean(query.list_modules) } };

    return this.http.get<Accounts.Memberships>(route, payload).pipe(
      pluck('data', 'documents'),
      map((memberships: Array<Membership>): Array<Membership> => {
        if (query.type) {
          return memberships.filter(membership => membership.type === query.type);
        } else {
          return memberships;
        }
      })
    );
  }

  /**
   * Determine if the username exists on the server. The server returns 404 Not
   * Found if the username isn't found, so the method catches the error and
   * returns Username with { existence: false } because the error can become
   * quite annoying.
   */

  username(username: string): Observable<Username> {
    const route: string = this.routes.account.username;
    const payload: any = { params: { username } };

    return this.http.get<Accounts.Username>(route, payload).pipe(
      map((res: Accounts.Username): Username => ({ ...res.data, exists: true })),
      catchError((error: HttpErrorResponse): Observable<Username> => {
        if (error.status === NOT_FOUND) {
          return of({ username, exists: false, language: undefined });
        } else {
          return throwError(error);
        }
      })
    );
  }
}
