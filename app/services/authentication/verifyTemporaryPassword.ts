import type { AuthError } from "@supabase/supabase-js";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { checkWorkerPassword } from "./checkWorkerPassword";
import { isInvalidCredentialsAuthError } from "./isInvalidCredentialsAuthError";
import { mapCurrentPasswordError } from "./mapCurrentPasswordError";
import type { SignedInWorker } from "./models/SignedInWorker.interface";
import type { TemporaryPasswordVerification } from "./models/TemporaryPasswordVerification.interface";
import { recordFailedSignIn } from "./recordFailedSignIn";

const confirmed = (
  passwordAlreadyUpdated: boolean
): TemporaryPasswordVerification => ({
  error: null,
  passwordAlreadyUpdated,
});

const rejected = (
  error: AuthError
): TemporaryPasswordVerification => ({
  error: mapCurrentPasswordError(error),
  passwordAlreadyUpdated: false,
});

export const verifyTemporaryPassword = async (
  worker: SignedInWorker,
  input: PasswordChangeInput
): Promise<TemporaryPasswordVerification> => {
  const temporaryError = await checkWorkerPassword(
    worker.username,
    input.currentPassword
  );

  if (!temporaryError) {
    return confirmed(false);
  }

  if (!isInvalidCredentialsAuthError(temporaryError)) {
    return rejected(temporaryError);
  }

  const newPasswordError = await checkWorkerPassword(
    worker.username,
    input.newPassword
  );

  if (!newPasswordError) {
    return confirmed(true);
  }

  if (!isInvalidCredentialsAuthError(newPasswordError)) {
    return rejected(newPasswordError);
  }

  await recordFailedSignIn(worker.username);

  return rejected(temporaryError);
};
