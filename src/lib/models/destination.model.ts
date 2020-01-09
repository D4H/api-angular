/**
 * Destination
 * =============================================================================
 * When moving an Equipment item to-or searching for-a new destination, the
 * actual destination is one of:
 *
 *  - Equipment
 *  - Location
 *  - Member
 *
 * When searching, DestinationService searches for destinations by merging
 * queries to multiple endpoints:
 *
 *  - GET /team/members?name=$QUERY
 *  - GET /team/equipment?barcode=$QUERY
 *  - GET /team/equipment?ref=$QUERY
 *  - GET /team/locations?title=$QUERY
 */

export enum DestinationType {
  Equipment = 'equipment',
  Location = 'location',
  Member = 'member'
}

export interface Destination {
  description: string;
  id: number;
  title: string;
  type: DestinationType;

  context?: {
    id: number;
    type: DestinationType;
  };
}
