import { DateParameter } from './shared.res';

/**
 * GET /organisation/image
 * GET /team/image
 * GET /team/equipment/:id/image
 * GET /team/equipment/brands/:id/image
 * GET /team/equipment/models/:id/image
 * GET /team/equipment/suppliers/:id/image
 * GET /team/members/:id/image
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamMembersMemberImage
 *
 * All image endpoints share the same parameters and response format. On
 * ?version=foo:: Although not clearly noted in API documentation, adding the
 * "version=foo" parameter in a request modifies the response:
 *
 *  1. The API will return an image if it has been modified since the time.
 *  2. Else the server will return 204 No Content.
 *
 * The 204 No Content signal comes without CORS headers, and is treated as an
 * error response to boot. The violation of CORS security causes browsers to
 * kill the request without notifying the JavaScript application. Successfully
 * using "version=?foo" will cause a programmatic request to black hole, from
 * the point of the JavaScript application.
 *
 * Despite that the intended function of "version=foo" is cache images, in
 * practice the parameter so completely broken that ironically the only actual
 * use I have found for this has been as a cache-breaking URL parameter.
 */

export enum Size {
  Original = 'original',
  Preview = 'preview',
  Thumbnail = 'thumbnail'
}

export interface Params {
  size?: Size;
  version?: DateParameter;
}
