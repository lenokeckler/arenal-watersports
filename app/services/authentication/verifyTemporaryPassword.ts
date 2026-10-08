import type { AuthError } from "@supabase/supabase-js";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { checkWorkerPassword } from "./checkWorkerPassword";
import { isInvalidCredentialsAuthError } from "./isInvalidCredentialsAuthError";
import { mapTemporaryPasswordError } from "./mapTemporaryPasswordError";
import type { FirstSignInWorker } from "./models/FirstSignInWorker.interface";
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
  error: mapTemporaryPasswordError(error),
  passwordAlreadyUpdated: false,
});

export const verifyTemporaryPassword = async (
  worker: FirstSignInWorker,
  input: FirstPasswordChangeInput
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
