/**
 * Account Username
 * =============================================================================
 * Returned from GET /account/username?username=foo
 *
 * language is an optional paramter because in most real-world cases it is not
 * used for anything: existence is the important parameter.
 */

export interface Username {
  exists: boolean;
  language?: string;
  username: string;
}
