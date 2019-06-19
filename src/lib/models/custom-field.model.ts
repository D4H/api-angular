import { IsoDate } from './general.model';

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
  | Array<number | string | IsoDate | CustomFieldChoice>
  | IsoDate
  | string;

export interface CustomField {
  archived: boolean;
  bundle: string;
  choices?: { [key: string]: string }; // if choice.multiple or choice.single
  entity_id: number; // member_id
  hint?: string;
  id: number;
  label: string;
  member_edit_own: boolean;
  ordering: number;
  postfix?: any;
  required: boolean;
  secure: boolean;
  type: CustomFieldType;
  value: CustomFieldValue;
  value_string: string;
}
