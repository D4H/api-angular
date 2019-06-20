import { Language } from './language.model';

export interface Account {
  created: Date;
  expires_on?: Date;
  permissions?: object; // Deprecated: Permissions now on team member.
  token: string;
  token_id: number;
  type: string;

  account: {
    created: Date;
    id: number;
    language: Language;
    lastlogin: Date;
    primary_email: string;
    signed_tandc?: boolean; // Deprecated: Agreed terms and conditions?
    username: string;
  };

  scope: {
    profile: string;
    source: string;
  };
}
