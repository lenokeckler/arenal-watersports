import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const recordSuccessfulSignIn = async (
  userId: string
): Promise<void> => {
  const { error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.RECORD_SUCCESSFUL_SIGN_IN,
      { p_user_id: userId }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.RECORD_SUCCESSFUL_SIGN_IN
  );
};
