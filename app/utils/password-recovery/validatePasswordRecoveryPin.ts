import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";
import type { PasswordRecoveryPinInput } from "./models/PasswordRecoveryPinInput.interface";
import { validatePasswordRecoveryRequest } from "./validatePasswordRecoveryRequest";
import { validatePasswordResetPin } from "./validatePasswordResetPin";

export const validatePasswordRecoveryPin = ({
  pin,
  username,
}: PasswordRecoveryPinInput): NullableRef<PasswordRecoveryError> =>
  validatePasswordRecoveryRequest({ username }) ??
  validatePasswordResetPin(pin);
