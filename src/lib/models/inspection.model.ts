import { InheritedEntity } from './inherited-entity.model';
import { Interval } from './interval.model';
import { IsoDate } from './iso-date.model';

/**
 * Inspection
 * =============================================================================
 * From: /team/inspections(/:id)
 *
 * An inspection is more like a fixed repeating event than it is a logical
 * business object. An inspection is an equipment inventory. Each interval_unit *
 * interval_value, the fixed list of items on it are re-inspected.
 *
 * An Inspection record has these XOR fields:
 *
 *  - organisation_id ^ team_id
 *  - location_id ^ member_id
 */

export interface Inspection {
  active: boolean;
  all_kinds: boolean;
  bundle: string;
  date_due: IsoDate;
  description?: string; // Only present when set in web.
  gear_parent_id: number;
  id: number;
  interval_unit: Interval;
  interval_value: number;
  is_auto_unserviceable: boolean;
  items_count: number;
  items_due_count: number;
  location_id: number;
  member_id: number;
  organisation_id?: number;
  reminder_unit: Interval;
  reminder_value: number;
  team_id?: number;
  title: string;
}
