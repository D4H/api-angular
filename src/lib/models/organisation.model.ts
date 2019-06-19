import { IsoDate } from './general.model';

/**
 * Organisation Information Object
 * =============================================================================
 * Returned from GET /organisation
 */

export interface Organisation {
  country: string;
  created: IsoDate;
  created_by_id: boolean;
  currency: string;
  document_container_id?: number;
  document_public_container_id?: number;
  document_public_container_url?: string;
  document_vendor?: string;
  id: number;
  latlng: string;
  mapstyle: number;
  reporting_start_day: number;
  reporting_start_month: number;
  timezone: string;
  title: string;
  units: number;
  weight_units: number;
  zoom: number;
}
