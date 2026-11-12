import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { validatePasswordRecoveryPin } from "@/app/utils/password-recovery/validatePasswordRecoveryPin";
import { exchangePasswordResetPin } from "./exchangePasswordResetPin";
import type { PasswordRecoveryPinResult } from "./models/PasswordRecoveryPinResult.type";

const exchangeQuietly = async (
  input: PasswordRecoveryPinInput
): Promise<PasswordRecoveryPinResult> => {
  try {
    const grant = await exchangePasswordResetPin(input);

    return grant === null
      ? failPasswordRecovery(
          PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID
        )
      : { grant, ok: true };
  } catch {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }
};

export const verifyPasswordResetPin = async (
  input: PasswordRecoveryPinInput
): Promise<PasswordRecoveryPinResult> => {
  const validationError =
    validatePasswordRecoveryPin(input);

  if (validationError) {
    return { error: validationError, ok: false };
  }

  return await exchangeQuietly(input);
};
