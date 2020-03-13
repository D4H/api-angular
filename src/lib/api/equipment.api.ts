import { DateParameter, Response, Search } from './shared.api';
import { Equipment, EquipmentStatus } from '../models';

/**
 * GET /team/equipment
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipment
 */

export interface Search extends Search {
  barcode?: string;
  brand_id?: number;
  category_id?: number;
  fund_id?: number;
  id?: number;
  include_current?: boolean;
  include_other?: boolean;
  inspection_id?: number;
  is_critical?: boolean;
  is_expired?: boolean;
  kind_id?: number;
  location_id?: number;
  member?: number | 'me';
  model_id?: number;
  parent_id?: number;
  ref?: string;
  status?: EquipmentStatus;
  supplersref_id?: number;
  supplier_id?: number;
}

export interface Index extends Response<Array<Equipment>> {}

/**
 * GET /team/equipment/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipmentEquipment_id
 */

export interface Show extends Response<Equipment> {}

/**
 * PUT /team/equipment/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamEquipmentEquipment_id
 */

export interface Change {
  barcode?: string;
  is_critical?: boolean;
  is_monitor?: boolean;
  // Per docs: "Valid values: 1 2 3 4 5"
  status_id?:
    EquipmentStatus.Operational
    | EquipmentStatus.Unserviceable
    | EquipmentStatus.Retired
    | EquipmentStatus.Lost
    | EquipmentStatus.Wishlist;
}

export interface Update extends Response<Equipment> {}
