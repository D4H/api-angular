/**
 * D4H Entity
 * =============================================================================
 * This is full(-ish) list of D4H business object type. Extracted per PHP class
 * below. Used for the search API, e.g.
 *
 * @example
 *
 *  GET /team/search?entity_type=group&query=Foo
 *
 * @see https://api.d4h.org/v2/documentation#operation/getTeamSearch
 * @see https://github.com/D4H/decisions-web-app/blob/16c104aefac9b0518894322101847f74c00cfa42/app/Library/ObjectDefinition/EntityTypeEnum.php#L151-L694
 */

export type EntityType
  = 'account'
  | 'activity'
  | 'admin'
  | 'animal'
  | 'animal-qualification'
  | 'member2activity'
  | 'audit'
  | 'capability'
  | 'bundle'
  | 'casualty'
  | 'chat_item'
  | 'company'
  | 'contact'
  | 'costing'
  | 'custom_field'
  | 'report'
  | 'division'
  | 'document'
  | 'duty'
  | 'entity_bundle'
  | 'event'
  | 'exercise'
  | 'folder'
  | 'gear'
  | 'gear_brand'
  | 'gear_category'
  | 'gear_fund'
  | 'gear_type'
  | 'gear_kit'
  | 'gear_location'
  | 'gear_model'
  | 'gear_move'
  | 'repair'
  | 'gear_retired_reason'
  | 'group'
  | 'handler'
  | 'handler-qualification'
  | 'hazmat_container_type'
  | 'hazmat_incident_type'
  | 'hazmat_lab_status'
  | 'hazmat_lab_type'
  | 'hazmat_outcome'
  | 'hazmat_material'
  | 'hazmat_property_type'
  | 'healthsafety_cat'
  | 'healthsafety_report'
  | 'healthsafety_sev'
  | 'incident'
  | 'index'
  | 'inspection'
  | 'inspection2gear'
  | 'location_bookmark'
  | 'member'
  | 'member-qualification'
  | 'officer'
  | 'organisation'
  | 'person'
  | 'person_involved'
  | 'course'
  | 'resource'
  | 'resource_type'
  | 'role'
  | 'short_url'
  | 'supplier'
  | 'suppliers-ref'
  | 'tag'
  | 'task'
  | 'unit'
  | 'vehicle'
  | 'whiteboard';
