import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as API from '../resources';
import { ApiHttpClient } from '../client/api.client';
import { HttpOptions } from '../providers';
import { Membership } from '../models';

export class InvalidPhotoUrlError extends Error {
  constructor(url: string) {
    super(`URL ${url} is not valid for an image resource`);
  }
}

/**
 * API Photo Service
 * =============================================================================
 * For the given URL and parameters:
 *
 *  1. Fetch the photograph blob.
 *  2. Convert it into a SafeUrl, or undefined if the API returned nothing.
 *
 * @see https://api.d4h.org/v2/documentation#operation/getMembershipMembersMemberImage
 * @see https://api.d4h.org/v2/documentation#operation/getMembershipImage
 */

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private readonly imageUrl: RegExp = /\/image$/;

  constructor(
    protected readonly http: ApiHttpClient,
    protected readonly sanitizer: DomSanitizer
  ) {}

  /**
   * Fetch Photo by URL and Parameters
   * ===========================================================================
   * Used for members, images, equipment, etc.
   */

  get(url: string, params: API.Photos.Params = {}): Observable<SafeUrl> {
    if (this.imageUrl.test(url)) {
      const payload: HttpOptions = {
        responseType: 'blob' as 'json',
        params: params as any
      };

      return this.http.get<Blob>(url, payload).pipe(
        map((blob?: Blob): SafeUrl => this.sanitize(blob)),
        catchError(this.errorHandler)
      );
    } else {
      throw new InvalidPhotoUrlError(url);
    }
  }

  /**
   * Fetch Photo by Membership
   * ===========================================================================
   * Although not clearly noted in API documentation, adding the
   * "version=foo" parameter in a request modifies the response:
   *
   *  1. The API will return an image if it has been modified since the time.
   *  2. Else the server will return 204 No Content.
   *
   * The 204 No Content signal comes without CORS headers, and is treated as an
   * error response to boot. This violation of CORS security causes browsers to
   * kill the request without notifying the JavaScript application. Successfully
   * using "?version=foo" ironically causes a programmatic request to blackhole
   * from the point of the JavaScript application.
   *
   * Despite that the intended function of "?version=foo" is cache images, in
   * practice the parameter so completely broken that the only actual use I have
   * found for this has been to /break/ caching behaviour in browsers.
   *
   * Teams aren't RESTful resources e.g. /team/:id/image -> /team/image, with
   * requests differentiated by API bearer token.  Native browsers (Safari and
   * Chrome) are aggressive about caching programmatic blob requests. They
   * ignore the bearer token, so logically different requests will return the
   * wrong cached photo.
   *
   * In order to break caching behaviour and ensure that the browser returns the
   * correct image in all cases, I set version with a date keyed to the team's
   * ID, with a multiplier to magnify differences.
   *
   * @example
   *
   *   new Date(900 * 1000000) // Sun Jan 11 1970 11:00:00 GMT+0100
   *   new Date(901 * 1000000) // Thu Jan 01 1970 01:16:40 GMT+0100
   *
   * This is a terrible, horrible, no good, very bad hack that's necessary until
   * someone fixes non-RESTful team resources.
   *
   * @see https://api.d4h.org/v2/documentation#operation/getMembershipMembersMemberImage
   * @see https://api.d4h.org/v2/documentation#operation/getMembershipImage
   */

  membership(
    url: string,
    membership: Membership,
    params: API.Photos.Params = {}
  ): Observable<SafeUrl> {
    const multiplier = 1000000;

    const payload: HttpOptions = {
      responseType: 'blob' as 'json',
      headers: {
        Authorization: `Bearer ${membership.token}`
      },
      params: {
        version: new Date(Number(membership.unit.id) * multiplier),
        ...params as any
      }
    };

    return this.http.get<Blob>(url, payload).pipe(
      map((blob?: Blob): SafeUrl => this.sanitize(blob)),
      catchError(this.errorHandler)
    );
  }

  /**
   * TODO: Change Photo by URL
   * ===========================================================================
   * @example
   *
   *  PUT /team/equipment/:id/image
   *
   * @see https://api.d4h.org/v2/documentation#operation/putTeamEquipmentEquipment_idImage
   */

  NYI_update(url: string): Observable<void> {
    return;
  }

  /**
   * Sanitize Blob
   * ===========================================================================
   */

  private sanitize(blob?: Blob): SafeUrl {
    if (blob instanceof Blob) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(blob)
      );
    } else {
      return undefined;
    }
  }

  /**
   * Error Handler
   * ===========================================================================
   * There are cases where the file physically does not exist in our object
   * store. This catches any 404 errors so the app can display the default
   * placeholder instead.
   *
   * @see https://github.com/D4H/decisions-project/issues/3293
   */

  private errorHandler(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error.status === NOT_FOUND) {
      return of(undefined);
    } else {
      return throwError(error);
    }
  }
}
