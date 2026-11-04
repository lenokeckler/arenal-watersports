import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const finishPasswordRecovery = async (
  workerId: string
): Promise<void> => {
  const { error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.FINISH_PASSWORD_RECOVERY,
      { p_user_id: workerId }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.FINISH_PASSWORD_RECOVERY
  );
};
