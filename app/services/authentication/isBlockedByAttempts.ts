import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_BLOCKED_REASON,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const isBlockedByAttempts = async (
  workerId: string
): Promise<boolean> => {
  const { data, error } =
    await createServiceRoleSupabaseClient()
      .from(SUPABASE_TABLE.WORKERS)
      .select(SUPABASE_WORKER_COLUMN.BLOCKED_REASON)
      .eq(SUPABASE_WORKER_COLUMN.ID, workerId)
      .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  return (
    data?.blocked_reason ===
    SUPABASE_WORKER_BLOCKED_REASON.FAILED_ATTEMPTS
  );
};
