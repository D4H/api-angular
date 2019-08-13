/**
 * Password
 * =============================================================================
 * Used during authentication flows. Has the D4H server rejected the supplied
 * password?
 */

export interface Password {
  password: string;
  rejected: boolean;
}
