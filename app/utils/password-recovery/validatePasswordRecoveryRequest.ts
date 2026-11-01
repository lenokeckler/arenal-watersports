import type { NullableRef } from "@/app/types";
import { findUsernameErrorCode } from "@/app/utils/username/findUsernameErrorCode";
import { createPasswordRecoveryError } from "./createPasswordRecoveryError";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";
import type { PasswordRecoveryRequestInput } from "./models/PasswordRecoveryRequestInput.interface";

export const validatePasswordRecoveryRequest = ({
  username,
}: PasswordRecoveryRequestInput): NullableRef<PasswordRecoveryError> => {
  const usernameErrorCode = findUsernameErrorCode(username);

  return usernameErrorCode === null
    ? null
    : createPasswordRecoveryError(usernameErrorCode);
};
