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

export enum EntityType {
  Account = 'account',
  Activity = 'activity',
  Admin = 'admin',
  Animal = 'animal',
  AnimalQualification = 'animal-qualification',
  Attendance = 'member2activity',
  Audit = 'audit',
  Capability = 'capability',
  Bundle = 'bundle',
  Casualty = 'casualty',
  ChatItem = 'chat_item',
  Company = 'company',
  Contact = 'contact',
  Costing = 'costing',
  CustomField = 'custom_field',
  CustomReport = 'report',
  Division = 'division',
  Document = 'document',
  Duty = 'duty',
  EntityBundle = 'entity_bundle',
  Event = 'event',
  Exercise = 'exercise',
  Folder = 'folder',
  Gear = 'gear',
  GearBrand = 'gear_brand',
  GearCategory = 'gear_category',
  GearFund = 'gear_fund',
  GearKind = 'gear_type',
  GearKit = 'gear_kit',
  GearLocation = 'gear_location',
  GearModel = 'gear_model',
  GearMove = 'gear_move',
  GearRepair = 'repair',
  GearRetiredReason = 'gear_retired_reason',
  Group = 'group',
  Handler = 'handler',
  HandlerQualification = 'handler-qualification',
  HazmatContainerType = 'hazmat_container_type',
  HazmatIncidentType = 'hazmat_incident_type',
  HazmatLabStatus = 'hazmat_lab_status',
  HazmatLabType = 'hazmat_lab_type',
  HazmatOutcome = 'hazmat_outcome',
  HazmatMaterial = 'hazmat_material',
  HazmatPropertyType = 'hazmat_property_type',
  HealthSafetyCategory = 'healthsafety_cat',
  HealthSafetyReport = 'healthsafety_report',
  HealthSafetySeverity = 'healthsafety_sev',
  Incident = 'incident',
  IndexRecord = 'index',
  Inspection = 'inspection',
  InspectionResult = 'inspection2gear',
  LocationBookmark = 'location_bookmark',
  Member = 'member',
  MemberQualification = 'member-qualification',
  Officer = 'officer',
  Organisation = 'organisation',
  Person = 'person',
  PersonInvolved = 'person_involved',
  Course = 'course',
  Resource = 'resource',
  ResourceType = 'resource_type',
  Role = 'role',
  ShortUrl = 'short_url',
  Supplier = 'supplier',
  SuppliersRef = 'suppliers-ref',
  Tag = 'tag',
  Task = 'task',
  Unit = 'unit',
  Vehicle = 'vehicle',
  Whiteboard = 'whiteboard'
}
