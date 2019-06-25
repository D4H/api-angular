import { Currency } from './units.model';

export interface Cost {
  currency: Currency;
  value: number;
}
