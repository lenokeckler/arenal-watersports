import { validatePasswordNotCommon } from "@/app/services/password-policy";
import type { NullableRef } from "@/app/types";
import { mapPasswordChangeErrorToRecovery } from "@/app/utils/password-recovery/mapPasswordChangeErrorToRecovery";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { validatePasswordRecoveryReset } from "@/app/utils/password-recovery/validatePasswordRecoveryReset";

export const validatePasswordRecoveryResetOnServer = (
  input: PasswordRecoveryResetInput
): NullableRef<PasswordRecoveryError> => {
  const validationError =
    validatePasswordRecoveryReset(input);

  if (validationError) {
    return validationError;
  }

  const commonPasswordError = validatePasswordNotCommon(
    input.newPassword
  );

  return commonPasswordError
    ? mapPasswordChangeErrorToRecovery(commonPasswordError)
    : null;
};
