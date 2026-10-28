import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { validatePasswordChange } from "@/app/utils/password-change/validatePasswordChange";
import { isBlockedPasswordChangeError } from "@/app/utils/password-change/isBlockedPasswordChangeError";
import type { PasswordChangeResult } from "./models/PasswordChangeResult.type";
import { readSignedInWorker } from "./readSignedInWorker";
import { signOutEverywhere } from "./signOutEverywhere";
import { updateOwnPassword } from "./updateOwnPassword";
import { verifyCurrentPassword } from "./verifyCurrentPassword";

export const changeOwnPassword = async (
  input: PasswordChangeInput
): Promise<PasswordChangeResult> => {
  const validationError = validatePasswordChange(input);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerSupabaseClient();
  const worker = await readSignedInWorker(supabase);

  if (!worker || worker.mustChangePassword) {
    return {
      ok: false,
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.SESSION_INACTIVE
      ),
    };
  }

  const verificationError = await verifyCurrentPassword(
    supabase,
    worker,
    input.currentPassword
  );

  if (verificationError) {
    if (isBlockedPasswordChangeError(verificationError)) {
      await signOutEverywhere(supabase);
    }

    return { ok: false, error: verificationError };
  }

  const updateError = await updateOwnPassword(
    supabase,
    input
  );

  if (updateError) {
    return { ok: false, error: updateError };
  }

  return { ok: true };
};
