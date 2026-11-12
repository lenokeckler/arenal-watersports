import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const completeFirstPasswordChange = async (
  userId: string
): Promise<void> => {
  const { error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.COMPLETE_FIRST_PASSWORD_CHANGE,
      { p_user_id: userId }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.COMPLETE_FIRST_PASSWORD_CHANGE
  );
};
