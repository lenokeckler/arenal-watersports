import { createServerSupabaseClient } from "@/app/services/supabase";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { validatePasswordChange } from "@/app/utils/password-change/validatePasswordChange";
import type { PasswordChangeResult } from "./models/PasswordChangeResult.type";
import { reauthenticateSettledWorker } from "./reauthenticateSettledWorker";
import { updateOwnPassword } from "./updateOwnPassword";

export const changeOwnPassword = async (
  input: PasswordChangeInput
): Promise<PasswordChangeResult> => {
  const validationError = validatePasswordChange(input);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerSupabaseClient();
  const reauthentication =
    await reauthenticateSettledWorker(
      supabase,
      input.currentPassword
    );

  if (!reauthentication.ok) {
    return reauthentication;
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
