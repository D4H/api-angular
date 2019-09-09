import { XOR } from 'ts-xor';

/**
 * Team-Owned or Organisation-Owned Entity Model
 * =============================================================================
 * Consider this an abstract trait. Teams inherit their /categorization/ data
 * models from their parent organisation, in addition to the ability to
 * create these for themselves. These models range from member groups and roles
 * to equipment brands and retirement reasons.
 *
 * E.g, a team can create its own member roles in addition to being able to use
 * those from their organisation.
 *
 * These records have structure:
 *
 * @example
 *
 *  { organisation_id: number, team_id: null }
 *  { organisation_id: number, unit_id: null }
 *  { organisation_id: null, team_id: number }
 *  { organisation_id: null, unit_id: number }
 *
 * @example
 *
 *  // Valid
 *  const foo: OwnedEntity = { organisation_id: null, team_id: 1 };
 *
 *  // Valid
 *  const bar: OwnedEntity = { organisation_id: 1, team_id: null };
 *
 *  // Invalid
 *  const baz: OwnedEntity = { organisation_id: 1, team_id: 1 };
 *
 *  // Invalid
 *  const qux: OwnedEntity = { organisation_id: null, team_id: null };
 *
 * Use and extension of this is simple:
 *
 * @example
 *
 *  export interface ModelBase {
 *    id: number;
 *    title: string;
 *  }
 *
 *  export type Model = ModelBase & OwnedEntity;
 *
 * Models:
 *
 *  - Category
 *  - Fund
 *  - Group (as organisation_id/unit_id, declared in own model)
 *  - Inspection
 *  - Kind
 *  - Location
 *  - Model
 *  - Repair
 *  - RetiredReason
 *  - Role (as organisation/unit, declared in own model)
 *  - Supplier
 *  - SupplierRef
 */

export type InheritedEntity = XOR<
  { organisation_id: number, team_id: null },
  { organisation_id: null, team_id: number }
  >;
