import { HttpHeaders, HttpParams } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Region, Version } from './region.provider';

/**
 * Client Configuration
 * =============================================================================
 * Users inject either a static or observable configuration which is then
 * handled internally as an observable anyhow.
 */

export interface Client {
  name: string;
  version: string;
}

export interface Tokens {
  account?: string;
  organisation?: string;
  team?: string;
}

export interface Config {
  client: Client;
  region: Region;
  tokens: Tokens;
  version?: Version;
}

export interface ConfigProvider {
  config$: Observable<Config>;
}

/**
 * Client Tokens
 * =============================================================================
 */

export const CLIENT_NAME = 'D4H API CLIENT';
export const CLIENT_VERSION = '4.0.1';

export const CLIENT_CONFIG = new InjectionToken<ConfigProvider>(
  'CLIENT_CONFIGURATION'
);

export const CLIENT_DEFAULT_CONFIG = new InjectionToken<Partial<Config>>(
  'CLIENT_DEFAULT_CONFIGURATION'
);

// Set any defaults for optional values.

export const defaultConfig: Partial<Config> = {
  version: Version.V2,

  client: {
    name: CLIENT_NAME,
    version: CLIENT_VERSION
  }
};

/**
 * Client HttpClient Parameters
 * =============================================================================
 * Taken from Angular HttpClient and wrapped up here for niceness. The idea is
 * that the client transparently extends the necessary interfaces of Angular's
 * HttpClient.
 *
 * @see https://angular.io/api/common/http/HttpClient
 */

export type Params
  = HttpParams
  | { [param: string]: string | Array<string>; };

export type Headers
  = HttpHeaders
  | { [header: string]: string | Array<string>; };

export interface HttpOptions {
  body?: any;
  headers?: Headers;
  observe?: 'body';
  params?: Params;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

/**
 * Client Requests and Sigining
 * =============================================================================
 * Parse API requests to D4H. Various things have to be set:
 *
 * 1. Full resolved URL based on injected configuration.
 * 2. Authentication (bearer token) for authenticated routes.
 * 3. Assignation of other headers, such as client identication.
 * 4. Sanitization/handling of parameters.
 *
 * These are injected via the module to allow freedom of development later, and
 * to eventually open up wider configuration to developers.
 */

export interface ClientRequestParser {
  options(config: Config, url: string, options?: HttpOptions): HttpOptions;
  url(config: Config, url: string): string;
}

export interface ClientRequestAuth {
  bearerToken(tokens: Tokens, url: string, options: HttpOptions): { Authorization: string };
}
