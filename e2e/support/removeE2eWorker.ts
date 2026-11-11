import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_SUPABASE_ERROR,
  E2E_WORKER_DEPENDENT_TABLES,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const removeE2eWorker = async (
  supabase: SupabaseClient,
  workerId: string
): Promise<void> => {
  const failures: string[] = [];

  for (const {
    column,
    table,
  } of E2E_WORKER_DEPENDENT_TABLES) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(column, workerId);

    if (error) {
      failures.push(error.message);
    }
  }

  const { error: userError } =
    await supabase.auth.admin.deleteUser(workerId);

  if (userError) {
    failures.push(userError.message);
  }

  if (failures.length > 0) {
    failE2eOperation(
      "remove the E2E worker",
      failures.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
    );
  }
};
