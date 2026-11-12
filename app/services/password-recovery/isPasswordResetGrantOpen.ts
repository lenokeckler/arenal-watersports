import {
  PASSWORD_RECOVERY_GRANT,
  SUPABASE_RPC,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";

export const isPasswordResetGrantOpen = async (
  grant: string
): Promise<boolean> => {
  if (!PASSWORD_RECOVERY_GRANT.PATTERN.test(grant)) {
    return false;
  }

  try {
    const { data, error } =
      await createServiceRoleSupabaseClient().rpc(
        SUPABASE_RPC.PASSWORD_RESET_GRANT_IS_OPEN,
        { p_token: grant }
      );

    return error === null && data === true;
  } catch {
    return false;
  }
};
