/**
 * Member Status Labels
 * =============================================================================
 * Member status labels are a complex thing. At the highest level are four
 * operational status types. "Public" denotes public within the scope of the
 * team, "Restricted" denoted restricted to Editor role or higher within the
 * team.
 *
 *  1. Operational: [Public], all current active members.
 *  2. Non-Operational: [Public], all inactive (say, on holidays) members.
 *  3. Retired: [Restricted], people no longer members of team.
 *  4. Deleted: [Restricted], outright gone and deleted people.
 *
 * Below this are alias labels within the scope of an organisation, e.g.
 *
 * @example
 *
 *  Operational ->
 *    Fellowshiping
 *    Adventuring
 *    Striding
 *
 *  Non-Operational ->
 *    Resting at Elf Haven
 *    In Undying Lands
 *
 * A member /always/ has an OperationalStatus. A member /might/ have an
 * associated OperationalStatus label. In the data result from
 * GET /team/members(/:id) a member will always have a status field. The status
 * field will have a label alias label when one is used.
 *
 * @example
 *
 *  Frodo Baggins             -> Operational (No Label)
 *  Aragorn, Son of Arathorn  -> Striding (Operational)
 *  Gandalf the White         -> Resting at Elf Haven (Non-Operational)
 *
 * @example
 *
 *  const frodo: Member = {
 *    name: 'Frodo Baggins',
 *    // ...
 *
 *    status: {
 *      type: 'Operational'
 *      value: 'Operational'
 *      // No label.
 *    }
 *  };
 *
 *  const aragorn: Member = {
 *    name: 'Aragorn, Son of Arathorn',
 *    // ...
 *
 *    status: {
 *      type: 'Operational'
 *      value: 'Operational'
 *
 *      label: {
 *        value: 'Striding'
 *      }
 *    }
 *  };
 *
 * The general format of this has proven painful, and is on our internal TODO
 * list to fix.
 *
 * ---
 *
 * GET /team/members/status-labels returns organisation operational statuses and
 * associated alias labels.
 */

export enum OperationalStatus {
  Operational = 'Operational',
  NonOperational = 'Non-Operational',
  Retired = 'Retired',
  Deleted = 'Deleted'
}

export interface StatusLabel {
  id: number;
  organisation_id: number;
  type: OperationalStatus;
  value: string;

  // Restricted.
  labels?: Array<{
    id: number;
    ordering: number;
    organisation_id: number;
    team_id?: number;
    value: string;
  }>;
}
