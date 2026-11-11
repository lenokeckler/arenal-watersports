import {
  PERSONAL_EMAIL_ERROR_CODE,
  type PersonalEmailErrorCode,
} from "@/app/constants";
import { isPersonalEmailErrorCode } from "./isPersonalEmailErrorCode";

export const resolvePersonalEmailErrorCode = (
  code: string
): PersonalEmailErrorCode =>
  isPersonalEmailErrorCode(code)
    ? code
    : PERSONAL_EMAIL_ERROR_CODE.UNKNOWN;
