/**
 * Brand
 * =============================================================================
 * Brand is inheritable from organization. Only one of these will be present:
 *
 *  - organisation_id
 *  - team_id
 */

export interface Brand {
  count: number;
  count_inactive: number;
  count_inservice: number;
  count_lost: number;
  count_outservice: number;
  id: number;
  organisation_id?: number;
  quantity: number;
  team_id?: number;
  title: string;
  total_value: number;
  total_weight: number;
}
