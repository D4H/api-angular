import { Currency } from './units.model';

/**
 * Costing
 * =============================================================================
 * Multiple models have costing information. Some use key currency, others key
 * symbol.
 *
 * @see https://github.com/D4H/decisions-project/issues/3922
 */

export interface CurrencyCost {
  currency: Currency;
  value: number;
}

export interface SymbolCost {
  symbol: Currency;
  value: number;
}
