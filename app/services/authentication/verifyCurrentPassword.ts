import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { checkWorkerPassword } from "./checkWorkerPassword";
import { isBlockedByAttempts } from "./isBlockedByAttempts";
import { isInvalidCredentialsAuthError } from "./isInvalidCredentialsAuthError";
import { mapCurrentPasswordError } from "./mapCurrentPasswordError";
import type { SignedInWorker } from "./models/SignedInWorker.interface";
import { recordFailedSignIn } from "./recordFailedSignIn";
import { recordSuccessfulSignIn } from "./recordSuccessfulSignIn";

export const verifyCurrentPassword = async (
  worker: SignedInWorker,
  currentPassword: string
): Promise<NullableRef<PasswordChangeError>> => {
  const checkError = await checkWorkerPassword(
    worker.username,
    currentPassword
  );

  if (!checkError) {
    await recordSuccessfulSignIn(worker.id);

    return null;
  }

  if (!isInvalidCredentialsAuthError(checkError)) {
    return mapCurrentPasswordError(checkError);
  }

  await recordFailedSignIn(worker.username);

  const blocked = await isBlockedByAttempts(worker.id);

  return createPasswordChangeError(
    blocked
      ? PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
      : PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );
};
