import type { WorkerMarkChangeResult } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { changeWorkerMark } from "./changeWorkerMark";
import type { WorkerMarkChange } from "./models/WorkerMarkChange.interface";

export const changeWorkerMarkAsSignedIn = async (
  change: WorkerMarkChange
): Promise<WorkerMarkChangeResult> =>
  changeWorkerMark(
    await createServerSupabaseClient(),
    change
  );
