import deepmerge from 'deepmerge';
import faker from 'faker';
import { Currency, CurrencyCost, SymbolCost } from '../../lib/models';

export function CurrencyCost(attributes: Partial<CurrencyCost> = {}): CurrencyCost {
  return deepmerge<CurrencyCost>({
    currency: faker.finance.currencySymbol() as Currency,
    value: faker.random.number()
  }, attributes);
}

export function SymbolCost(attributes: Partial<SymbolCost> = {}): SymbolCost {
  return deepmerge<SymbolCost>({
    symbol: faker.finance.currencySymbol() as Currency,
    value: faker.random.number()
  }, attributes);
}
