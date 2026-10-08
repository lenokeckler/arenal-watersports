import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_ERROR,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

const DEPENDENT_TABLES = [
  {
    column: E2E_SUPABASE_COLUMN.WORKER_ID,
    table: E2E_SUPABASE_TABLE.WORKER_AREAS,
  },
  {
    column: E2E_SUPABASE_COLUMN.WORKER_ID,
    table: E2E_SUPABASE_TABLE.WORKER_MARKS,
  },
  {
    column: E2E_SUPABASE_COLUMN.WORKER_ID,
    table: E2E_SUPABASE_TABLE.PASSWORD_RESET_PINS,
  },
  {
    column: E2E_SUPABASE_COLUMN.ID,
    table: E2E_SUPABASE_TABLE.WORKERS,
  },
] as const;

export const removePendingWorker = async (
  supabase: SupabaseClient,
  workerId: string
): Promise<void> => {
  const failures: string[] = [];

  for (const { column, table } of DEPENDENT_TABLES) {
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
      "remove the pending worker",
      failures.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
    );
  }
};
