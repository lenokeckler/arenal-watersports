import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";

export const deletePredefinedComboFixtureWorker = async (
  supabase: SupabaseClient<Database>,
  resources: PredefinedComboFixtureResources
): Promise<unknown[]> => {
  const { error: areaError } = await supabase
    .from("worker_areas")
    .delete()
    .eq("worker_id", resources.workerId);
  const { error: workerError } = await supabase
    .from("workers")
    .delete()
    .eq("id", resources.workerId);
  if (!resources.workerAuthCreated) {
    return [areaError, workerError].filter(Boolean);
  }
  const { error: authError } =
    await supabase.auth.admin.deleteUser(
      resources.workerId
    );
  return [areaError, workerError, authError].filter(
    Boolean
  );
};
