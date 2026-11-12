import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";

export const recordFailedSignIn = async (
  username: string
): Promise<void> => {
  const { error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.RECORD_FAILED_SIGN_IN,
      { p_username: normalizeUsername(username) }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.RECORD_FAILED_SIGN_IN
  );
};
