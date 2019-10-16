import { CurrencyCost } from './cost.model';
import { XOR } from 'ts-xor';

export type RoleInheritedEntity = XOR<
  { organisation_id: null, unit_id: number },
  { organisation_id: number, uniit_id: null }
  >;

export type Role = {
  bundle?: string;
  cost_per_hour?: CurrencyCost;
  cost_per_use?: CurrencyCost;
  id: number;
  title: string;
} & RoleInheritedEntity;
