import { IsoDate, NumericBoolean } from './general.model';

export enum ActivityType {
  Event = 'event',
  Exercise = 'exercise',
  Incident = 'incident'
}

export interface Activity {
  activity: ActivityType;
  archived: NumericBoolean;
  bearing: number;
  count_attendance: number;
  count_equipment_used: number;
  count_guests: number;
  countryaddress: string;
  date: IsoDate;
  description: string;
  distance: number;
  enddate: IsoDate;
  gridref: string;
  id: number;
  lat: number;
  latlng: string;
  lng: number;
  location_bookmark_id: number;
  night: NumericBoolean;
  perc_attendance: number;
  plan: string;
  postcodeaddress: string;
  pretasked: NumericBoolean;
  published: NumericBoolean;
  ref: string;
  ref_autoid: string;
  regionaddress: string;
  streetaddress: string;
  tasked_mobile: boolean;
  team_id: number;
  title: string;
  townaddress: string;
  tracking_number: number;
  weather: string;
}
