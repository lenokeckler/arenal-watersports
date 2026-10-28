import type { SupabaseClient } from "@supabase/supabase-js";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eWorkerRecord } from "./models/E2eWorkerRecord.interface";

export const insertE2eWorker = async (
  supabase: SupabaseClient,
  {
    mustChangePassword,
    username,
    workerId,
  }: E2eWorkerRecord
): Promise<void> => {
  const { error: insertError } = await supabase
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .insert({
      base_role: E2E_WORKER.BASE_ROLE,
      full_name: E2E_WORKER.FULL_NAME,
      id: workerId,
      must_change_password: mustChangePassword,
      username,
    });
  if (insertError) {
    failE2eOperation(
      "insert the E2E worker",
      insertError.message
    );
  }
};
