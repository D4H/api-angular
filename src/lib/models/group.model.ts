import { XOR } from 'ts-xor';

export type GroupInheritedEntity
  = XOR<
  { organisation: null, team: number },
  { organisation: number, team: null }
  >;

export type Group = {
  id: number;
  title: string;
} & GroupInheritedEntity;
