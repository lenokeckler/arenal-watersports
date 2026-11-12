import type {
  PersonalEmailErrorCode,
  PersonalEmailField,
} from "@/app/constants";

export interface PersonalEmailError {
  code: PersonalEmailErrorCode;
  field: PersonalEmailField;
}
