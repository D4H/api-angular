import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import {
  CLIENT_CONFIG,
  ClientConfig,
  ClientRequestParser,
  Headers,
  HttpOptions,
  Params
} from '../providers';

import { ParserClient } from './parser.client';

/**
 * D4H API HTTP Client
 * =============================================================================
 * This client extends Angular's HttpClient to offer the signing functionality
 * required for the D4H API. ApiHttpClient populates the complete server URL based
 * on configured region and version.
 *
 * Parameters, parsing, signing, etc. are handled by the internal parser.
 */

@Injectable({ providedIn: 'root' })
export class ApiHttpClient {
  constructor(
    @Inject(CLIENT_CONFIG) private readonly config$: Observable<ClientConfig>,
    private readonly http: HttpClient,
    private readonly parser: ParserClient
  ) {}

  get<T>(url: string, options: HttpOptions = {}): Observable<T> {
    return this.config$.pipe(
      take(1),
      mergeMap((config: ClientConfig): Observable<T> => this.http.get<T>(
        this.parser.url(config, url),
        this.parser.options(config, url, options)
      ))
    );
  }

  post<T>(url: string, body: any, options: HttpOptions = {}): Observable<T> {
    return this.config$.pipe(
      take(1),
      mergeMap((config: ClientConfig): Observable<T> => this.http.post<T>(
        this.parser.url(config, url),
        body,
        this.parser.options(config, url, options)
      ))
    );
  }

  put<T>(url: string, body: any, options: HttpOptions = {}): Observable<T> {
    return this.config$.pipe(
      take(1),
      mergeMap((config: ClientConfig): Observable<T> => this.http.put<T>(
        this.parser.url(config, url),
        body,
        this.parser.options(config, url, options)
      ))
    );
  }

  delete<T>(url: string, options: HttpOptions = {}): Observable<T> {
    return this.config$.pipe(
      take(1),
      mergeMap((config: ClientConfig): Observable<T> => this.http.delete<T>(
        this.parser.url(config, url),
        this.parser.options(config, url, options)
      ))
    );
  }
}
