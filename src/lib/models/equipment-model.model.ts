import { InheritedEntity } from './inherited-entity.model';

export type EquipmentModel = {
  count: number;
  count_inservice: number;
  count_outservice: number;
  id: number;
  quantity: number;
  title: string;
  total_value: number;
  total_weight: number;
  weight: number;

  brand: {
    id: number;
    title: string;
  }
} & InheritedEntity;
