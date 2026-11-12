import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const readWorkerPersonalEmail = async (
  workerId: string
): Promise<NullableRef<string>> => {
  const { data, error } =
    await createServiceRoleSupabaseClient()
      .from(SUPABASE_TABLE.WORKERS)
      .select(SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL)
      .eq(SUPABASE_WORKER_COLUMN.ID, workerId)
      .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  return data?.personal_email ?? null;
};
