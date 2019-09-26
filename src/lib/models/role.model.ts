import { Currency } from './units.model';
import { XOR } from 'ts-xor';

export type RoleInheritedEntity = XOR<
  { organisation_id: null, unit_id: number },
  { organisation_id: number, uniit_id: null }
  >;

export type Role = {
  bundle?: string;
  id: number;
  title: string;

  cost_per_hour?: {
    currency: Currency;
    value: number;
  };

  cost_per_use?: {
    currency: Currency;
    value: number;
  };
} & RoleInheritedEntity;
