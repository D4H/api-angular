import * as moment from 'moment';
import isIsoDate from 'is-iso-date';
import traverse from 'traverse';
import { Inject, Injectable } from '@angular/core';

import { AuthClient } from './auth.client';

import {
  CLIENT_DEFAULT_CONFIG,
  ClientConfig,
  ClientRequestParser,
  Headers,
  HttpOptions,
  Params,
  Version
} from '../providers';

/**
 * D4H API Request Parser
 * =============================================================================
 * This client extends Angular's HttpClient to offer the signing functionality
 * required for the D4H API. ApiHttpClient populates the complete server URL based
 * on configured region and version.
 */

@Injectable({ providedIn: 'root' })
export class ParserClient implements ClientRequestParser {
  constructor(
    @Inject(CLIENT_DEFAULT_CONFIG) private readonly config: ClientConfig,
    private readonly auth: AuthClient
  ) {}

  /**
   * Build Full API URL
   * ===========================================================================
   */

  url(config: ClientConfig, url: string): string {
    const version: Version = config.version || this.config.version;
    return new URL(`/${version}${url}`, `https://${config.region}`).toString();
  }

  /**
   * Prepare Request Options
   * ===========================================================================
   */

  options(config: ClientConfig, url: string, options: HttpOptions = {}): HttpOptions {
    return {
      ...options,
      params: this.stringifyDates(config, url, options),
      headers: this.headers(config, url, options)
    };
  }

  /**
   * Handle Response Parsing
   * ===========================================================================
   * In practice: If response is an object, then stringify any ISO-formatted
   * date strings found.
   */

  response<T>(res: T): T {
    if (res && res.constructor.name === 'Object') {
      return traverse(res).map(function(value: any): void {
        if (isIsoDate(value)) {
          this.update(new Date(value), true);
        }
      });
    } else {
      return res;
    }
  }

  /**
   * Add D4H Headers
   * ===========================================================================
   * Add configured client version and name to headers, and insert bearer token
   * if required.
   */

  private headers(config: ClientConfig, url: string, options: HttpOptions = {}): Headers {
    return {
      'x-source-client': config.client.name,
      'x-source-version': config.client.version,
      ...this.auth.bearerToken(config.tokens, url),
      ...options.headers
    };
  }

  /**
   * Stringify Date Parameters
   * ===========================================================================
   * Traverse request params and stringify Date and Moment objects in ISO 8601
   * format based on a shallow copy of the parameters options.
   *
   * As well as returning dates in ISO 8601 format, the D4H API expects query
   * parameters and body payloads to encode dates in this format.
   * encodeURIComponent is used to encode URL parameters:
   *
   * @example
   *
   *    // output -> Sat Nov 24 2018 10:22:35 GMT 0000
   *    encodeURIComponent(moment('Sat Nov 24 2018 10:22:35 GMT 0000'))
   *
   * Calling .toISOString() on a Date or Moment before this will return the
   * correct format:
   *
   * @example
   *
   *    // output -> 2018-11-24T10:19:13.535Z
   *    moment('Sat Nov 24 2018 10:22:35 GMT 0000').toISOString();
   */

  private stringifyDates(config: ClientConfig, url: string, options: HttpOptions = {}): Params {
    const params: Params = { ...options.params };

    return traverse(params).map(function(value: any): void {
      if (moment.isDate(value) || moment.isMoment(value)) {
        this.update(value.toISOString(), true);
      }
    });
  }
}
