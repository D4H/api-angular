import { EntityType } from './entity-type.model';
import { IsoDate } from './iso-date.model';

export interface SearchResult {
  created_at: IsoDate;
  organisation_id?: number;
  relevance?: number; // Float
  team_id?: number;
  updated_at: IsoDate;

  entity: {
    date?: IsoDate;
    description: string;
    id: number;
    title: string;
    type: EntityType;
  };
}
