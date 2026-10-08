import { SUPABASE_SIGN_OUT_SCOPE } from "@/app/constants";
import { createStatelessSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { isInvalidCredentialsAuthError } from "./isInvalidCredentialsAuthError";
import { mapTemporaryPasswordError } from "./mapTemporaryPasswordError";
import type { FirstSignInWorker } from "./models/FirstSignInWorker.interface";
import { recordFailedSignIn } from "./recordFailedSignIn";

export const verifyTemporaryPassword = async (
  worker: FirstSignInWorker,
  password: string
): Promise<NullableRef<FirstSignInError>> => {
  const throwawayClient = createStatelessSupabaseClient();
  const { error } =
    await throwawayClient.auth.signInWithPassword({
      email: toAuthEmail(worker.username),
      password,
    });

  if (error) {
    if (isInvalidCredentialsAuthError(error)) {
      await recordFailedSignIn(worker.username);
    }

    return mapTemporaryPasswordError(error);
  }

  const { error: signOutError } =
    await throwawayClient.auth.signOut({
      scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
    });

  if (signOutError) {
    throw signOutError;
  }

  return null;
};
