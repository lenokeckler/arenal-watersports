import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { validateFirstPasswordChange } from "@/app/utils/first-sign-in/validateFirstPasswordChange";
import { completeFirstPasswordChange } from "./completeFirstPasswordChange";
import type { FirstPasswordChangeResult } from "./models/FirstPasswordChangeResult.type";
import { readFirstSignInWorker } from "./readFirstSignInWorker";
import { refreshFirstSignInSession } from "./refreshFirstSignInSession";
import { updateSignedInPassword } from "./updateSignedInPassword";
import { verifyTemporaryPassword } from "./verifyTemporaryPassword";

export const changeFirstPassword = async (
  input: FirstPasswordChangeInput
): Promise<FirstPasswordChangeResult> => {
  const validationError =
    validateFirstPasswordChange(input);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerSupabaseClient();
  const worker = await readFirstSignInWorker(supabase);

  if (!worker) {
    return {
      ok: false,
      error: createFirstSignInError(
        FIRST_SIGN_IN_ERROR_CODE.SESSION_INACTIVE
      ),
    };
  }

  const temporaryError = await verifyTemporaryPassword(
    worker,
    input.currentPassword
  );

  if (temporaryError) {
    return { ok: false, error: temporaryError };
  }

  const updateError = await updateSignedInPassword(
    supabase,
    input.newPassword
  );

  if (updateError) {
    return { ok: false, error: updateError };
  }

  await completeFirstPasswordChange(worker.id);
  await refreshFirstSignInSession(supabase);

  return { ok: true };
};
