import type { NullableRef } from "@/app/types";
import { validateNewPassword } from "@/app/utils/password-change/validateNewPassword";
import { validatePasswordConfirmation } from "@/app/utils/password-change/validatePasswordConfirmation";
import { mapPasswordChangeErrorToRecovery } from "./mapPasswordChangeErrorToRecovery";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";
import type { PasswordRecoveryResetInput } from "./models/PasswordRecoveryResetInput.interface";
import { validatePasswordRecoveryRequest } from "./validatePasswordRecoveryRequest";
import { validatePasswordResetPin } from "./validatePasswordResetPin";

export const validatePasswordRecoveryReset = ({
  confirmPassword,
  newPassword,
  pin,
  username,
}: PasswordRecoveryResetInput): NullableRef<PasswordRecoveryError> => {
  const usernameError = validatePasswordRecoveryRequest({
    username,
  });

  if (usernameError !== null) {
    return usernameError;
  }

  const pinError = validatePasswordResetPin(pin);

  if (pinError !== null) {
    return pinError;
  }

  const newPasswordError = validateNewPassword(newPassword);

  if (newPasswordError !== null) {
    return mapPasswordChangeErrorToRecovery(
      newPasswordError
    );
  }

  const confirmationError = validatePasswordConfirmation(
    newPassword,
    confirmPassword
  );

  return confirmationError === null
    ? null
    : mapPasswordChangeErrorToRecovery(confirmationError);
};
