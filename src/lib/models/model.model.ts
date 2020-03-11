/**
 * Equipment Model
 * =============================================================================
 * Equipment Model is inheritable from organization. Only one of these will be
 * present:
 *
 *  - organisation_id
 *  - team_id
 */

export interface Model {
  count: number;
  count_inservice: number;
  count_outservice: number;
  id: number;
  organisation_id?: number;
  quantity: number;
  team_id?: number;
  title: string;
  total_value: number;
  total_weight: number;
  weight: number;

  brand: {
    id: number;
    title: string;
  };
}
