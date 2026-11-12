import type { NullableRef } from "@/app/types";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const readWorkerPersonalEmail = async (
  workerId: string
): Promise<NullableRef<string>> => {
  const { data, error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .select(E2E_SUPABASE_COLUMN.PERSONAL_EMAIL)
    .eq(E2E_SUPABASE_COLUMN.ID, workerId)
    .single();

  if (error) {
    return failE2eOperation(
      "read the worker personal email",
      error.message
    );
  }

  return data.personal_email;
};
