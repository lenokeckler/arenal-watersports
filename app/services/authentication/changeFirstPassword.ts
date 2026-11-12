import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { validatePasswordNotCommon } from "@/app/services/password-policy";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { validatePasswordChange } from "@/app/utils/password-change/validatePasswordChange";
import { changePendingPassword } from "./changePendingPassword";
import type { PasswordChangeResult } from "./models/PasswordChangeResult.type";
import { readSignedInWorker } from "./readSignedInWorker";
import { refreshFirstSignInSession } from "./refreshFirstSignInSession";

export const changeFirstPassword = async (
  input: PasswordChangeInput
): Promise<PasswordChangeResult> => {
  const validationError =
    validatePasswordChange(input) ??
    validatePasswordNotCommon(input.newPassword);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerSupabaseClient();
  const worker = await readSignedInWorker(supabase);

  if (!worker) {
    return {
      ok: false,
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.SESSION_INACTIVE
      ),
    };
  }

  if (!worker.mustChangePassword) {
    await refreshFirstSignInSession(supabase);

    return { ok: true };
  }

  return changePendingPassword(supabase, worker, input);
};
