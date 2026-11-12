import {
  PERSONAL_EMAIL_ERROR_FIELD,
  type PersonalEmailErrorCode,
} from "@/app/constants";

export const isPersonalEmailErrorCode = (
  code: string
): code is PersonalEmailErrorCode =>
  Object.hasOwn(PERSONAL_EMAIL_ERROR_FIELD, code);
