import { IsoDate } from './iso-date.model';

/**
 * Location Type
 * =============================================================================
 * Just an item of equipment can be assigned to a team member, so too can the
 * location of a repair be a person. Clarification comes per @tdtm.
 *
 * Literal    Type      Explanation
 * -----------------------------------------------------------------------------
 * null       Null      Default/omitted status. Same as passing 'all'.
 * number     Number    The ID of a Location record. Number >= 1.
 * none       String    Item which has no location assigned.
 * inbox      String    Item inbound from another team into the current team.
 * outbox     String    Item outbound towards from the curent team to another.
 * personal   String    Item assigned to people (but no person in particular).
 */

export type LocationType
  = null
  | number
  | 'all'
  | 'inbox'
  | 'none'
  | 'outbox'
  | 'personal';

/**
 * Location
 * =============================================================================
 */

export interface Location {
  bundle?: string;
  count: number;
  created: IsoDate;
  id: number;
  title: string;
  unit_id: number; // team_id
  unit_title: string; // team_name
  updated?: IsoDate;
}
