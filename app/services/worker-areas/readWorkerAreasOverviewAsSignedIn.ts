import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { WorkerAreasOverview } from "./models/WorkerAreasOverview.interface";
import { readWorkerAreasOverview } from "./readWorkerAreasOverview";

export const readWorkerAreasOverviewAsSignedIn = async (
  username: string
): Promise<NullableRef<WorkerAreasOverview>> =>
  readWorkerAreasOverview(
    await createServerSupabaseClient(),
    username
  );
