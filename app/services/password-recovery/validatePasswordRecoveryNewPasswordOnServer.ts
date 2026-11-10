import { validatePasswordNotCommon } from "@/app/services/password-policy";
import type { NullableRef } from "@/app/types";
import { mapPasswordChangeErrorToRecovery } from "@/app/utils/password-recovery/mapPasswordChangeErrorToRecovery";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";
import { validatePasswordRecoveryNewPassword } from "@/app/utils/password-recovery/validatePasswordRecoveryNewPassword";

export const validatePasswordRecoveryNewPasswordOnServer = (
  input: PasswordRecoveryNewPasswordInput
): NullableRef<PasswordRecoveryError> => {
  const validationError =
    validatePasswordRecoveryNewPassword(input);

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
