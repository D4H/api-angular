import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiHttpClient } from '../client/api.client';
import { ClientModule } from '../client.module';
import { HttpOptions } from '../providers';
import { Photos } from '../api';

/**
 * API Photo Service
 * =============================================================================
 * For the given URL and parameters:
 *
 *  1. Fetch the photograph blob.
 *  2. Convert it into a SafeUrl, or null if the API returned nothing.
 *
 * @see https://api.d4h.org/v2/documentation#operation/getMembershipMembersMemberImage
 * @see https://api.d4h.org/v2/documentation#operation/getMembershipImage
 */

@Injectable({ providedIn: ClientModule })
export class PhotoService {
  constructor(
    protected readonly http: ApiHttpClient,
    protected readonly sanitizer: DomSanitizer
  ) {}

  get(url: string, options: HttpOptions = {}): Observable<SafeUrl> {
    const payload: HttpOptions = {
      ...options,
      responseType: 'blob' as 'json' // Hack for Angular compiler.
    };

    return this.http.get<Blob>(url, payload).pipe(
      map((blob?: Blob): SafeUrl => this.sanitize(blob)),
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  private sanitize(blob?: Blob): SafeUrl {
    if (blob instanceof Blob) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(blob)
      );
    } else {
      return null;
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
      return of(null);
    } else {
      return throwError(error);
    }
  }
}
