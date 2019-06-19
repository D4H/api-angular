import { Note } from '../models';
import { DateParameter, Response, Search } from './general.route';

/**
 * GET /team/whiteboard
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamWhiteboard
 */

export interface Search extends Search {
  after?: DateParameter;
  before?: DateParameter;
  id?: number;
  included_archived?: boolean;
}

export interface Index extends Response<Array<Note>> {}

/**
 * GET /team/whiteboard/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/getTeamWhiteboardMessage_id
 */

export interface Show extends Response<Note> {}

/**
 * POST /team/whiteboard
 * =============================================================================
 * Notes are created in the context of the team and member associated with the
 * bearer token.
 *
 * @see https://api.d4h.org/v2/documentation#operation/postTeamWhiteboard
 */

export interface New {
  enddate: DateParameter;
  important?: boolean;
  text: string;
}

export interface Create extends Response<Note> {}

/**
 * PUT /team/whiteboard/:id
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/putTeamWhiteboardMessage_id
 */

export interface Change {
  enddate?: DateParameter;
  important?: boolean;
  text?: string;
}

export interface Update extends Response<Note> {}

/**
 * GET /account/username
 * =============================================================================
 * @see https://api.d4h.org/v2/documentation#operation/deleteTeamWhiteboardMessage_id
 */

export type Destroy = undefined;
