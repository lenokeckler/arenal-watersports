import type { WorkerAreaChangeResult } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { changeWorkerArea } from "./changeWorkerArea";
import type { WorkerAreaChange } from "./models/WorkerAreaChange.interface";

export const changeWorkerAreaAsSignedIn = async (
  change: WorkerAreaChange
): Promise<WorkerAreaChangeResult> =>
  changeWorkerArea(
    await createServerSupabaseClient(),
    change
  );
