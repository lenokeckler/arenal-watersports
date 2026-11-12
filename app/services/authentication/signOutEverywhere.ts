import {
  SUPABASE_AUTH_OPERATION,
  SUPABASE_SIGN_OUT_SCOPE,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";

export const signOutEverywhere = async (
  supabase: ServerSupabaseClient
): Promise<void> => {
  const { error } = await supabase.auth.signOut({
    scope: SUPABASE_SIGN_OUT_SCOPE.GLOBAL,
  });

  throwIfSupabaseAuthError(
    error,
    SUPABASE_AUTH_OPERATION.SIGN_OUT_EVERYWHERE
  );
};
