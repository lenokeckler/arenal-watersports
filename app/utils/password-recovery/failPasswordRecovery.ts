import type { PasswordRecoveryErrorCode } from "@/app/constants";
import { createPasswordRecoveryError } from "./createPasswordRecoveryError";
import type { PasswordRecoveryFailure } from "./models/PasswordRecoveryFailure.interface";

export const failPasswordRecovery = (
  code: PasswordRecoveryErrorCode
): PasswordRecoveryFailure => ({
  error: createPasswordRecoveryError(code),
  ok: false,
});
