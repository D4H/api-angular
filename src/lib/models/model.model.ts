/**
 * Equipment Model
 * =============================================================================
 * From /team/equipment/models
 *
 * This is a /model/ of equipment, e.g. a Dell monitor, or Apple laptop.
 *
 * XOR attributes:
 *
 *  - organisation_id ^ team_id;
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
