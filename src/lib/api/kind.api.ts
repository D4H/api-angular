import { Kind, KindType } from '../models';
import { Query as Search, Response } from './shared.api';

/**
 * GET /team/equipment/kinds
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipmentKinds
 */

export interface Query extends Search {
  id?: number;
  include_empty?: boolean;
  included_inherited?: boolean;
  location_id?: number;
  meets_level?: boolean;
  type?: KindType;
  sort?: string;
}

export interface Index extends Response<Array<Kind>> {}

/**
 * GET /team/equipment/kinds/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipmentKindsKind_id
 */

export interface Show extends Response<Kind> {}

/**
 * POST /team/equipment/kinds
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/postTeamEquipmentKinds
 */

export interface New {
  category_id: number;
  cost_per_distance?: number;
  cost_per_hour?: number;
  cost_per_use?: number;
  required?: number;
  title: string;
  type: KindType;
}

export interface Create extends Response<Kind> {}

/**
 * PUT /team/equipment/kinds/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamEquipmentKindsKind_id
 */

export interface Change {
  category_id?: number;
  cost_per_distance?: number;
  cost_per_hour?: number;
  cost_per_use?: number;
  required?: number;
  supply_alert?: boolean;
  title?: string;
  type?: KindType;
}

export interface Update extends Response<Kind> {}

/**
 * DELETE /team/equipment/kinds/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamEquipmentKindsKind_id
 */

export type Destroy = undefined;
