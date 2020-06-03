import { CustomField } from '../models';
import { EntityType } from '../models';
import { Query as Search, Response } from './shared.api';

/**
 * GET /team/custom-fields
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamWhiteboard
 */

export interface Query extends Search {
  bundle_id?: number;
  entity_type?: EntityType;
  include_inherited?: boolean;
  included_archived?: boolean;
  included_archived_options?: boolean;
  member_edit_own?: boolean;
}

export interface Index extends Response<Array<CustomField>> {}

/**
 * GET /team/custom-fields
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamWhiteboard
 */

export interface IndexEntity extends Response<Array<CustomField>> {}

/**
 * GET /team/custom-fields/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamCustomfieldsId
 */

export interface Show extends Response<CustomField> {}

/**
 * POST /team/custom-fields
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/postTeamCustomfields
 */

export interface New {
  active?: boolean;
  bundle?: string;
  bundle_id?: number;
  choices?: any;
  entity_type: EntityType;
  hint?: string;
  mandatory?: boolean;
  member_edit_own?: boolean;
  ordering?: number;
  searchable?: boolean;
  secure?: boolean;
  title: string;
  type?: string;
  units?: string;
}

export interface Create extends Response<CustomField> {}

/**
 * PUT /team/custom-fields/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamCustomfieldsId
 */

export interface Change {
  active?: boolean;
  bundle?: string;
  bundle_id?: number;
  choices?: any;
  hint?: string;
  mandatory?: boolean;
  member_edit_own?: boolean;
  ordering?: number;
  searchable?: boolean;
  secure?: boolean;
  title?: string;
  units?: string;
}

export interface Update extends Response<CustomField> {}

/**
 * DELETE /team/custom-fields/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamCustomfieldsId
 */

export type Destroy = undefined;
