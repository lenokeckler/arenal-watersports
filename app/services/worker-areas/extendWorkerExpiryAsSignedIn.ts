import type { WorkerAccountResult } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { extendWorkerExpiry } from "./extendWorkerExpiry";
import type { WorkerExpiryExtension } from "./models/WorkerExpiryExtension.interface";

export const extendWorkerExpiryAsSignedIn = async (
  extension: WorkerExpiryExtension
): Promise<WorkerAccountResult> =>
  extendWorkerExpiry(
    await createServerSupabaseClient(),
    extension
  );
