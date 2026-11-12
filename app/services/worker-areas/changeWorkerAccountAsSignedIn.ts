import type { WorkerAccountResult } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { changeWorkerAccount } from "./changeWorkerAccount";
import type { WorkerAccountChange } from "./models/WorkerAccountChange.interface";

export const changeWorkerAccountAsSignedIn = async (
  change: WorkerAccountChange
): Promise<WorkerAccountResult> =>
  changeWorkerAccount(
    await createServerSupabaseClient(),
    change
  );
