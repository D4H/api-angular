/**
 * Equipment Kind
 * =============================================================================
 */

export enum KindType {
  Equipment = 'equipment',
  Supply = 'supply',
  Vehicle = 'vehicle'
}

export interface Kind {
  category_id: number;
  cost_per_distance: number;
  cost_per_hour: number;
  cost_per_use: number;
  count: number;
  count_inactive: number;
  count_inservice: number;
  count_lost: number;
  count_outservice: number;
  id: number;
  organisation_id: number;
  quantity: number;
  required: number;
  supply_alert: boolean;
  team_id: number;
  title: string;
  total_value: number;
  total_weight: number;
  type: KindType;
}
