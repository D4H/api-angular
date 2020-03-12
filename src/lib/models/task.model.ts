import { IsoDate } from './iso-date.model';

/**
 * Task
 * =============================================================================
 * A number of D4H business objects represent tasks to be completed on a gear
 * item. These are:
 *
 *  - Inspection
 *  - Repair
 *  - Result
 *
 * And likely more to follow in future. These features were originally released
 * with no shared purpose or abstraction, but for the purposes of D4H mobile
 * apps we've found it necessary to merge these together. Not every record has
 * every attribute, like e.g. a repair has no reminder_date, while an inspection
 * has no date_completed.
 *
 * A task item has into one of five statuses:
 *
 *  - Never:      (!date_completed && !date_due)
 *  - Completed:  (date_completed < now)
 *  - DueNow:     (date_due < now && !date_completed)
 *  - DueSoon:    (date_due > now && reminder_date && reminder_date < now)
 *  - DueLater:   (date_due > now && reminder_date && reminder_date > now)
 */

export interface Task {
  date_completed?: IsoDate;
  date_due?: IsoDate;
  reminder_date?: IsoDate;
}

export enum TaskStatus {
  Never,
  Complete,
  DueNow,
  DueSoon,
  DueLater
}
