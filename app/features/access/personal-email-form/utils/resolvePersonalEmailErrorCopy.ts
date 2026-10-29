import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import {
  PERSONAL_EMAIL_ERROR_COPY,
  PERSONAL_EMAIL_REQUIRED_COPY,
} from "../constants/PersonalEmailErrorCopy.constants";
import type { PersonalEmailErrorCopy } from "../models/PersonalEmailErrorCopy.type";
import type { PersonalEmailErrorCopyOptions } from "../models/PersonalEmailErrorCopyOptions.interface";

const resolveRequiredCopy = ({
  hasEmail,
  isRequired,
}: PersonalEmailErrorCopyOptions): string => {
  if (isRequired) {
    return PERSONAL_EMAIL_REQUIRED_COPY.ADMINISTRATION;
  }

  return hasEmail
    ? PERSONAL_EMAIL_REQUIRED_COPY.REGISTERED
    : PERSONAL_EMAIL_REQUIRED_COPY.UNREGISTERED;
};

export const resolvePersonalEmailErrorCopy = (
  options: PersonalEmailErrorCopyOptions
): PersonalEmailErrorCopy => ({
  ...PERSONAL_EMAIL_ERROR_COPY,
  [PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED]:
    resolveRequiredCopy(options),
});
