import { CurrencyCost } from './cost.model';

/**
 * Role
 * =============================================================================
 * Role is inheritable from organization. Only one of these will be present:
 *
 *  - organisation_id
 *  - unit_id
 */

export interface Role {
  bundle?: string;
  cost_per_hour?: CurrencyCost;
  cost_per_use?: CurrencyCost;
  id: number;
  title: string;
  organisation_id?: number;
  unit_id?: number;
}
