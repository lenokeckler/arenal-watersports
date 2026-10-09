import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_FIELD,
  type PersonalEmailErrorCode,
} from "@/app/constants";

const isPersonalEmailErrorCode = (
  code: string
): code is PersonalEmailErrorCode =>
  Object.hasOwn(PERSONAL_EMAIL_ERROR_FIELD, code);

export const resolvePersonalEmailErrorCode = (
  code: string
): PersonalEmailErrorCode =>
  isPersonalEmailErrorCode(code)
    ? code
    : PERSONAL_EMAIL_ERROR_CODE.UNKNOWN;
