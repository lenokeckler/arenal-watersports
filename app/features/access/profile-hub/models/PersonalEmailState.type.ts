import { PERSONAL_EMAIL_STATE } from "../constants/PersonalEmailState.constants";

export type PersonalEmailState =
  (typeof PERSONAL_EMAIL_STATE)[keyof typeof PERSONAL_EMAIL_STATE];
