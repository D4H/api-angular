import { Response, Search } from './shared.api';
import { Category } from '../models';

/**
 * GET /team/equipment/categories
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipmentCategories
 */

export interface Search extends Search {
  id?: number;
  include_empty?: boolean;
  included_inherited?: boolean;
  location_id?: number;
  sort?: string;
}

export interface Index extends Response<Array<Category>> {}

/**
 * GET /team/equipment/categories/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamEquipmentCategoriesCategory_id
 */

export interface Show extends Response<Category> {}

/**
 * POST /team/equipment/categories
 * =============================================================================
 * Categories are created in the context of the team and member associated with the
 * bearer token.
 *
 * @see https://api.d4h.org/v2/documentation#operation/postTeamEquipmentCategories
 */

export interface New {
  title: string;
}

export interface Create extends Response<Category> {}

/**
 * PUT /team/equipment/categories/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamEquipmentCategoriesCategory_id
 */

export interface Change {
  title: string;
}

export interface Update extends Response<Category> {}

/**
 * DELETE /team/equipment/categories/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamEquipmentCategoriesCategory_id
 */

export type Destroy = undefined;
