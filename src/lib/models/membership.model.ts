import { IsoDate } from './iso-date.model';
import { Language } from './language.model';

export enum MembershipType {
  Team = 'member',
  Organisation = 'officer'
}

// From GET /account/memberships?list_modules=true
export interface MembershipModule {
  activities: boolean;
  address_book: boolean;
  api_access: boolean;
  app_equipment_enterprise: boolean;
  calendar: boolean;
  charts: boolean;
  collaboration: boolean;
  communication: boolean;
  costing: boolean;
  courses: boolean;
  dashboard: boolean;
  documents: boolean;
  duty: boolean;
  emergency_contacts: boolean;
  equipment: boolean;
  equipment_funding: boolean;
  equipment_inspections: boolean;
  equipment_repairs: boolean;
  equipment_team_move: boolean;
  events: boolean;
  exercises: boolean;
  groups: boolean;
  hazmat: boolean;
  incidents: boolean;
  lost_behaviour: boolean;
  mapsar: boolean;
  members: boolean;
  old_communication: boolean;
  persons_involved: boolean;
  reports: boolean;
  resources: boolean;
  roles: boolean;
  tags: boolean;
  tasks: boolean;
  vehicles_involved: boolean;
  weather: boolean;
  whiteboard: boolean;
}

export interface Membership {
  id: number; // Membership *member* ID.
  language: Language;
  lastlogin?: IsoDate;
  name: string;
  token: string;
  type: MembershipType;
  urls?: object; // Unused image URL.

  organisation: {
    id: number;
    name: string;
    urls?: object; // Unused image URL.
  };

  unit: {
    id: number; // Actual ID of membership object.
    modules?: MembershipModule;
    name: string;
    urls?: object; // Unused image URL.
  };
}
