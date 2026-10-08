import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { completeFirstPasswordChange } from "./completeFirstPasswordChange";
import type { FirstPasswordChangeResult } from "./models/FirstPasswordChangeResult.type";
import type { FirstSignInWorker } from "./models/FirstSignInWorker.interface";
import { recordSuccessfulSignIn } from "./recordSuccessfulSignIn";
import { refreshFirstSignInSession } from "./refreshFirstSignInSession";
import { updateSignedInPassword } from "./updateSignedInPassword";
import { verifyTemporaryPassword } from "./verifyTemporaryPassword";

export const changePendingPassword = async (
  supabase: ServerSupabaseClient,
  worker: FirstSignInWorker,
  input: FirstPasswordChangeInput
): Promise<FirstPasswordChangeResult> => {
  const verification = await verifyTemporaryPassword(
    worker,
    input
  );

  if (verification.error) {
    return { ok: false, error: verification.error };
  }

  await recordSuccessfulSignIn(worker.id);

  if (!verification.passwordAlreadyUpdated) {
    const updateError = await updateSignedInPassword(
      supabase,
      input.newPassword
    );

    if (updateError) {
      return { ok: false, error: updateError };
    }
  }

  await completeFirstPasswordChange(worker.id);
  await refreshFirstSignInSession(supabase);

  return { ok: true };
};
