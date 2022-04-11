import { Consent } from 'src/enums';

export type ConsentType = {
  id: Consent;
  enabled: boolean;
};
export type UserType = {
  id: string;
  email: string;
  consents: ConsentType[];
};
