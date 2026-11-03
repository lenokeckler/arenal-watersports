import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { completeFirstPasswordChange } from "./completeFirstPasswordChange";
import type { PasswordChangeResult } from "./models/PasswordChangeResult.type";
import type { SignedInWorker } from "./models/SignedInWorker.interface";
import { recordSuccessfulSignIn } from "./recordSuccessfulSignIn";
import { refreshFirstSignInSession } from "./refreshFirstSignInSession";
import { updateSignedInPassword } from "./updateSignedInPassword";
import { verifyTemporaryPassword } from "./verifyTemporaryPassword";

export const changePendingPassword = async (
  supabase: ServerSupabaseClient,
  worker: SignedInWorker,
  input: PasswordChangeInput
): Promise<PasswordChangeResult> => {
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
