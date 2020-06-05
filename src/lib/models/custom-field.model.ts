import { EntityType } from './entity-type.model';
import { IsoDate } from './iso-date.model';

/**
 * Member Optional Custom Field
 * =============================================================================
 */

export interface CustomFieldChoice {
  id: number;
  value: string;
}

export enum CustomFieldType {
  Date = 'date',
  DateTime = 'datetime',
  Float = 'number.float',
  Int = 'number.int',
  MultipleChoice = 'choice.multiple',
  Number = 'number',
  SingleChoice = 'choice.single',
  Text = 'text',
  TextArea = 'textarea',
  Time = 'time'
}

export type CustomFieldValue
  = number
  | Array<number | string | CustomFieldChoice | IsoDate>
  | IsoDate
  | string;

export interface CustomField {
  active: boolean;
  bundle_hidden: boolean;
  bundle_id: number;
  bundle_title: string;
  created_at: IsoDate;
  entity_options: Array<any>;
  entity_type: EntityType;
  entity_value: any;
  field_options: any;
  hint: string;
  id: number;
  mandatory: boolean;
  member_edit_own: boolean;
  ordering: number;
  organisation_id: number;
  searchable: boolean;
  secure: boolean;
  team_id: number;
  title: string;
  type: CustomFieldType;
  units: number;
  updated_at: IsoDate;
}
