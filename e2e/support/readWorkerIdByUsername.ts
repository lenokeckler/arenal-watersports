import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const readWorkerIdByUsername = async (
  username: string
): Promise<string> => {
  const { data, error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .select(E2E_SUPABASE_COLUMN.ID)
    .eq(E2E_SUPABASE_COLUMN.USERNAME, username)
    .single();

  if (error) {
    return failE2eOperation(
      "read the worker id",
      error.message
    );
  }

  return data.id;
};
