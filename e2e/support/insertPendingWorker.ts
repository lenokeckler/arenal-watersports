import type { SupabaseClient } from "@supabase/supabase-js";
import { E2E_PENDING_WORKER } from "../constants/E2eFirstSignIn.constants";
import {
  E2E_SUPABASE_ERROR,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const insertPendingWorker = async (
  supabase: SupabaseClient,
  workerId: string,
  username: string
): Promise<void> => {
  const { error: insertError } = await supabase
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .insert({
      base_role: E2E_PENDING_WORKER.BASE_ROLE,
      full_name: E2E_PENDING_WORKER.FULL_NAME,
      id: workerId,
      must_change_password: true,
      username,
    });
  if (!insertError) {
    return;
  }
  const { error: rollbackError } =
    await supabase.auth.admin.deleteUser(workerId);
  const reasons = [
    insertError.message,
    rollbackError?.message,
  ].filter(Boolean);

  failE2eOperation(
    "insert the pending worker",
    reasons.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
  );
};
