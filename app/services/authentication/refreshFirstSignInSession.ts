import { SESSION_CLAIM } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";

const PENDING_CHANGE_MESSAGE =
  "The refreshed session still requires a password change";
const MISSING_CLAIMS_MESSAGE =
  "The refreshed session carries no claims";

export const refreshFirstSignInSession = async (
  supabase: ServerSupabaseClient
): Promise<void> => {
  const { error: refreshError } =
    await supabase.auth.refreshSession();

  if (refreshError) {
    throw refreshError;
  }

  const { data, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) {
    throw claimsError;
  }

  if (!data) {
    throw new Error(MISSING_CLAIMS_MESSAGE);
  }

  if (
    data.claims[SESSION_CLAIM.MUST_CHANGE_PASSWORD] !==
    false
  ) {
    throw new Error(PENDING_CHANGE_MESSAGE);
  }
};
