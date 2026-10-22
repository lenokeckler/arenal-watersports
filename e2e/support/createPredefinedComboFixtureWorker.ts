import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";

export const createPredefinedComboFixtureWorker = async (
  supabase: SupabaseClient<Database>,
  resources: PredefinedComboFixtureResources
): Promise<void> => {
  const { error: authError } =
    await supabase.auth.admin.createUser({
      email: resources.workerEmail,
      email_confirm: true,
      id: resources.workerId,
      password: resources.workerPassword,
    });
  if (authError) {
    throw authError;
  }
  resources.workerAuthCreated = true;
  const { error: workerError } = await supabase
    .from("workers")
    .insert({
      base_role: "reservas",
      full_name:
        E2E_PREDEFINED_COMBO_FIXTURE.WORKER_FULL_NAME,
      id: resources.workerId,
      must_change_password: false,
      personal_email: resources.workerEmail,
      username: resources.workerUsername,
    });
  if (workerError) {
    throw workerError;
  }
};
