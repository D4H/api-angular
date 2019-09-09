import { InheritedEntity } from './inherited-entity.model';

export type Brand = {
  count: number;
  count_inactive: number;
  count_inservice: number;
  count_lost: number;
  count_outservice: number;
  id: number;
  quantity: number;
  title: string;
  total_value: number;
  total_weight: number;
} & InheritedEntity;
