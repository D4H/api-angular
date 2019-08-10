import { IsoDate } from './iso-date.model';
import { Language } from './language.model';

export interface Account {
  created: IsoDate;
  expires_on?: IsoDate;
  permissions?: object; // Deprecated: Permissions now on team member.
  token: string;
  token_id: number;
  type: string;

  account: {
    created: IsoDate;
    id: number;
    language: Language;
    lastlogin: IsoDate;
    primary_email: string;
    signed_tandc?: boolean; // Deprecated: Agreed terms and conditions?
    username: string;
  };

  scope: {
    profile: string;
    source: string;
  };
}
