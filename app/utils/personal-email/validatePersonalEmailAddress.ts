import {
  PERSONAL_EMAIL,
  PERSONAL_EMAIL_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { normalizePersonalEmail } from "./normalizePersonalEmail";
import type { PersonalEmailAddressResult } from "./models/PersonalEmailAddressResult.type";

export const validatePersonalEmailAddress = (
  raw: string
): PersonalEmailAddressResult => {
  const address = normalizePersonalEmail(raw);

  if (address === STRING.Empty) {
    return {
      code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED,
      ok: false,
    };
  }

  if (address.length > PERSONAL_EMAIL.MAX_LENGTH) {
    return {
      code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_TOO_LONG,
      ok: false,
    };
  }

  const [localPart] = address.split(STRING.AT);

  if (
    localPart.length > PERSONAL_EMAIL.LOCAL_PART_MAX_LENGTH
  ) {
    return {
      code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_TOO_LONG,
      ok: false,
    };
  }

  if (!PERSONAL_EMAIL.PATTERN.test(address)) {
    return {
      code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID,
      ok: false,
    };
  }

  return { address, ok: true };
};
