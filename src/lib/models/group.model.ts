/**
 * Group
 * =============================================================================
 * Group is inheritable from organization. Only one of these will be present:
 *
 *  - organisation
 *  - team
 */

export interface Group {
  id: number;
  title: string;
  organisation?: number;
  team?: number;
}
