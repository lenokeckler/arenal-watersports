import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { isBlockedReauthenticationError } from "@/app/utils/reauthentication/isBlockedReauthenticationError";
import type { ReauthenticationResult } from "./models/ReauthenticationResult.type";
import { readSignedInWorker } from "./readSignedInWorker";
import { signOutEverywhere } from "./signOutEverywhere";
import { verifyCurrentPassword } from "./verifyCurrentPassword";

export const reauthenticateSettledWorker = async (
  supabase: ServerSupabaseClient,
  currentPassword: string
): Promise<ReauthenticationResult> => {
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
    currentPassword
  );

  if (verificationError) {
    if (isBlockedReauthenticationError(verificationError)) {
      await signOutEverywhere(supabase);
    }

    return { ok: false, error: verificationError };
  }

  return { ok: true, worker };
};
