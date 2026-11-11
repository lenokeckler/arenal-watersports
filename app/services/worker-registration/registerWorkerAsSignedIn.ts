import { createServerSupabaseClient } from "@/app/services/supabase";
import type { WorkerRegistration } from "@/app/utils/worker-registration/models/WorkerRegistration.interface";
import type { WorkerRegistrationResult } from "./models/WorkerRegistrationResult.type";
import { registerWorker } from "./registerWorker";

export const registerWorkerAsSignedIn = async (
  registration: WorkerRegistration
): Promise<WorkerRegistrationResult> =>
  registerWorker(
    await createServerSupabaseClient(),
    registration
  );
