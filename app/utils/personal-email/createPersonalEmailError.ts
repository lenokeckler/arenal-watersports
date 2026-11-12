import {
  PERSONAL_EMAIL_ERROR_FIELD,
  type PersonalEmailErrorCode,
} from "@/app/constants";
import type { PersonalEmailError } from "./models/PersonalEmailError.interface";

export const createPersonalEmailError = (
  code: PersonalEmailErrorCode
): PersonalEmailError => ({
  code,
  field: PERSONAL_EMAIL_ERROR_FIELD[code],
});
