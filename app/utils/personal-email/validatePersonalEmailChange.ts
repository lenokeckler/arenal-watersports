import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
} from "@/app/constants";
import { validateCurrentPassword } from "@/app/utils/reauthentication/validateCurrentPassword";
import { createInvalidPersonalEmailChange } from "./createInvalidPersonalEmailChange";
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
    return createInvalidPersonalEmailChange(
      PERSONAL_EMAIL_ERROR_CODE.INTENT_INVALID
    );
  }

  const address =
    intent === PERSONAL_EMAIL_INTENT.SAVE
      ? validatePersonalEmailAddress(email)
      : null;

  if (address && !address.ok) {
    return createInvalidPersonalEmailChange(address.code);
  }

  const passwordErrorCode =
    validateCurrentPassword(currentPassword);

  if (passwordErrorCode) {
    return createInvalidPersonalEmailChange(
      passwordErrorCode
    );
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
