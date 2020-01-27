/**
 * Destination
 * =============================================================================
 * When moving an Equipment item to-or searching for-a new destination, the
 * actual destination is one of:
 *
 *  - Equipment: Put a wrench in a toolkit.
 *  - Location: Put the toolkit on a shelf.
 *  - Member: Give the toolkit to a member.
 *
 * when one moves an item of Equipment to a new location. Users can browse
 * different locations, see the equipment contents of a destination, and assign
 * an item to the new destination.
 *
 * unassignable:
 * -----------------------------------------------------------------------------
 * Some destinations are not unassignable e.g. equipment of type 'supply'. These
 * are consumables such as a box of pens. Logically a wrench should not go
 * inside a box of pens.
 */

export enum DestinationType {
  All = 'all',
  Equipment = 'gear',
  Location = 'gear_location',
  Member = 'member',
  Team = 'unit'
}

export interface Destination {
  description: string;
  id: number;
  title: string;
  type: DestinationType;
  unassignable: boolean;

  context?: {
    id: number;
    type: DestinationType;
  };
}
