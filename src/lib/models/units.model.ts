/**
 * API Currency, Distance, Temperature and Weight Units
 * =============================================================================
 * List of D4H-returned currency symbols with duplicates removed extracted from
 * Decisions at paths:
 *
 *  api_v2/app/utils/enums/Currencies.json
 *  api_v2/app/utils/enums/Temperature.json
 *  api_v2/app/entities/Unit.json
 */

export type Currency
  = '$'
  | 'CHF'
  | 'Ft'
  | 'HK$'
  | 'Mex$'
  | 'R'
  | 'RM'
  | 'S$'
  | 'kr'
  | 'kr'
  | 'kr.'
  | '£'
  | '¥'
  | '¥'
  | 'Íkr'
  | '฿'
  | '€'
  | '₹'
  | '₽';

export type Weight
  = 'lbs'
  | 'kg';

export type System
  = 'imperial'
  | 'metric';

export type Distance
  = { name: 'kilometer', symbol: 'km' }
  | { name: 'mile', symbol: 'm' };

export type Temperature
  = { name: 'Celsius', symbol: '°C' }
  | { name: 'Fahrenheit', symbol: '°F' }
  | { name: 'Kelvin', symbol: 'K' };
