import { Config } from '../../lib/providers';

/**
 * Testing regex to match valid D4h API endpooints.
 * @see https://regex101.com/r/m2vMa6/1
 */

export const API_URL_REGEX: RegExp = /^https:\/\/api(\.(ap|ca|eu|st))?\.d4h\.org\/v[1-3]\//;

/**
 * Testing regex to match valid SafeURL for D4H API photo.
 * @see https://regex101.com/r/7A3KFd/1
 * @see https://stackoverflow.com/a/6640851/1433400
 */

// tslint:disable-next-line: max-line-length
export const API_PHOTO_URL_REGEX: RegExp = /^blob:http:\/\/localhost:\d{4}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * Generate API URL
 * =============================================================================
 * Generate valid D4H API URL for the given configuration and path.
 */

export function ApiUrl(config: Partial<Config>, path: string, params: any = {}): string {
  const url: string = new URL(`/${config.version}${path}`, `https://${config.region}`) .toString();
  const keys: Array<string> = Object.keys(params);

  if (keys.length) {
    return `${url}?${keys.map(key => `${key}=${params[key]}`).join('&')}`;
  } else {
    return url;
  }
}
