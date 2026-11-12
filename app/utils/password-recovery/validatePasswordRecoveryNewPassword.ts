import type { NullableRef } from "@/app/types";
import { validateNewPassword } from "@/app/utils/password-change/validateNewPassword";
import { validatePasswordConfirmation } from "@/app/utils/password-change/validatePasswordConfirmation";
import { mapPasswordChangeErrorToRecovery } from "./mapPasswordChangeErrorToRecovery";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";
import type { PasswordRecoveryNewPasswordInput } from "./models/PasswordRecoveryNewPasswordInput.interface";

export const validatePasswordRecoveryNewPassword = ({
  confirmPassword,
  newPassword,
}: PasswordRecoveryNewPasswordInput): NullableRef<PasswordRecoveryError> => {
  const passwordError =
    validateNewPassword(newPassword) ??
    validatePasswordConfirmation(
      newPassword,
      confirmPassword
    );

  return passwordError === null
    ? null
    : mapPasswordChangeErrorToRecovery(passwordError);
};
