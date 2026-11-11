import { SESSION_CLAIM } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";

export const readMustChangePasswordClaim = async (
  supabase: ServerSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabase.auth.getClaims();

  return (
    !error &&
    data?.claims[SESSION_CLAIM.MUST_CHANGE_PASSWORD] ===
      true
  );
};
