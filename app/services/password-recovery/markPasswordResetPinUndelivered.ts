import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const markPasswordResetPinUndelivered = async (
  pinId: string
): Promise<void> => {
  const { error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.MARK_PASSWORD_RESET_PIN_UNDELIVERED,
      { p_pin_id: pinId }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.MARK_PASSWORD_RESET_PIN_UNDELIVERED
  );
};
