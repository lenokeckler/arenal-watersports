import type { AuthError } from "@supabase/supabase-js";
import {
  SUPABASE_AUTH_OPERATION,
  SUPABASE_SIGN_OUT_SCOPE,
} from "@/app/constants";
import { createStatelessSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";

export const checkWorkerPassword = async (
  username: string,
  password: string
): Promise<NullableRef<AuthError>> => {
  const throwawayClient = createStatelessSupabaseClient();
  const { error } =
    await throwawayClient.auth.signInWithPassword({
      email: toAuthEmail(username),
      password,
    });

  if (error) {
    return error;
  }

  const { error: signOutError } =
    await throwawayClient.auth.signOut({
      scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
    });

  throwIfSupabaseAuthError(
    signOutError,
    SUPABASE_AUTH_OPERATION.SIGN_OUT_THROWAWAY
  );

  return null;
};
