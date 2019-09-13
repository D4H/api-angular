import { InspectionResult, Equipment } from '../models';
import { DateParameter, Response, Search } from './shared.res';

/**
 * GET /team/equipment
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipment
 */

export interface Search extends Search {
  brand_id?: number;
  category_id?: number;
  fund_id?: number;
  id?: number;
  include_current?: boolean;
  include_other?: boolean;
  is_critical?: boolean;
  is_expired?: boolean;
  kind_id?: number;
  location_id?: number;
  member?: number | 'me';
  model_id?: number;
  parent_id?: number;
  ref?: string;
  status?: InspectionResult;
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
  location_id?: number;
  member?: number | 'me';
  parent_id?: number;
  // TODO: Asked @tdtm about status_id in Slack.
  // Per docs: "Valid values: 1 3 4 5"
  status_id?: InspectionResult;
}

export interface Update extends Response<Equipment> {}