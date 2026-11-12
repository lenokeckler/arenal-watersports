import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const redeemPasswordResetGrant = async (
  grant: string
): Promise<NullableRef<string>> => {
  const { data, error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.REDEEM_PASSWORD_RESET_GRANT,
      { p_token: grant }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.REDEEM_PASSWORD_RESET_GRANT
  );

  return data;
};
