import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RESET_PIN,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createPasswordRecoveryError } from "./createPasswordRecoveryError";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";
import { normalizePasswordResetPin } from "./normalizePasswordResetPin";

export const validatePasswordResetPin = (
  pin: string
): NullableRef<PasswordRecoveryError> => {
  const normalizedPin = normalizePasswordResetPin(pin);

  if (normalizedPin === STRING.Empty) {
    return createPasswordRecoveryError(
      PASSWORD_RECOVERY_ERROR_CODE.PIN_REQUIRED
    );
  }

  if (!PASSWORD_RESET_PIN.PATTERN.test(normalizedPin)) {
    return createPasswordRecoveryError(
      PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT
    );
  }

  return null;
};
