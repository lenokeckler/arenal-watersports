import {
  SESSION_CLAIM,
  SESSION_REFRESH_ERROR_MESSAGE,
  SUPABASE_AUTH_OPERATION,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";

export const refreshFirstSignInSession = async (
  supabase: ServerSupabaseClient
): Promise<void> => {
  const { error: refreshError } =
    await supabase.auth.refreshSession();

  throwIfSupabaseAuthError(
    refreshError,
    SUPABASE_AUTH_OPERATION.REFRESH_SESSION
  );

  const { data, error: claimsError } =
    await supabase.auth.getClaims();

  throwIfSupabaseAuthError(
    claimsError,
    SUPABASE_AUTH_OPERATION.GET_CLAIMS
  );

  if (!data) {
    throw new Error(
      SESSION_REFRESH_ERROR_MESSAGE.MISSING_CLAIMS
    );
  }

  if (
    data.claims[SESSION_CLAIM.MUST_CHANGE_PASSWORD] !==
    false
  ) {
    throw new Error(
      SESSION_REFRESH_ERROR_MESSAGE.PENDING_CHANGE
    );
  }
};
