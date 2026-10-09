import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
  STRING,
} from "@/app/constants";
import { isPasswordTooLong } from "@/app/utils/password/isPasswordTooLong";
import { createPersonalEmailError } from "./createPersonalEmailError";
import { isPersonalEmailIntent } from "./isPersonalEmailIntent";
import type { PersonalEmailChangeInput } from "./models/PersonalEmailChangeInput.interface";
import type { PersonalEmailValidation } from "./models/PersonalEmailValidation.type";
import { validatePersonalEmailAddress } from "./validatePersonalEmailAddress";

export const validatePersonalEmailChange = ({
  currentPassword,
  email,
  intent,
}: PersonalEmailChangeInput): PersonalEmailValidation => {
  if (!isPersonalEmailIntent(intent)) {
    return {
      error: createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.INTENT_INVALID
      ),
      ok: false,
    };
  }

  const address =
    intent === PERSONAL_EMAIL_INTENT.SAVE
      ? validatePersonalEmailAddress(email)
      : null;

  if (address && !address.ok) {
    return {
      error: createPersonalEmailError(address.code),
      ok: false,
    };
  }

  if (currentPassword === STRING.Empty) {
    return {
      error: createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
      ),
      ok: false,
    };
  }

  if (isPasswordTooLong(currentPassword)) {
    return {
      error: createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG
      ),
      ok: false,
    };
  }

  if (address) {
    return {
      change: {
        address: address.address,
        currentPassword,
        intent: PERSONAL_EMAIL_INTENT.SAVE,
      },
      ok: true,
    };
  }

  return {
    change: {
      currentPassword,
      intent: PERSONAL_EMAIL_INTENT.REMOVE,
    },
    ok: true,
  };
};
