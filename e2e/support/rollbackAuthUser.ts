import type { SupabaseClient } from "@supabase/supabase-js";
import { E2E_SUPABASE_ERROR } from "../constants/E2eSupabase.constants";

export const rollbackAuthUser = async (
  supabase: SupabaseClient,
  workerId: string,
  cause: unknown
): Promise<never> => {
  const { error } =
    await supabase.auth.admin.deleteUser(workerId);

  if (error) {
    throw new Error(
      E2E_SUPABASE_ERROR.OPERATION_FAILED(
        E2E_SUPABASE_ERROR.ROLLBACK_OPERATION,
        error.message
      ),
      { cause }
    );
  }

  throw cause;
};
