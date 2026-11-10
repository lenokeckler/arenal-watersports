import type {
  PERSONAL_EMAIL_FIELD,
  PersonalEmailField,
} from "@/app/constants";

export type PersonalEmailFocusField = Exclude<
  PersonalEmailField,
  typeof PERSONAL_EMAIL_FIELD.FORM
>;
