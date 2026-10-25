import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerAreasOverview } from "./models/WorkerAreasOverview.interface";

export const readWorkerAreasOverview = async (
  supabase: ServerSupabaseClient,
  username: string
): Promise<NullableRef<WorkerAreasOverview>> => {
  const { data: worker, error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .select(SUPABASE_WORKER_COLUMN.WORKER_AREAS_OVERVIEW)
    .eq(SUPABASE_WORKER_COLUMN.USERNAME, username)
    .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  if (!worker) {
    return null;
  }

  const { data: areas, error: areasError } = await supabase
    .from(SUPABASE_TABLE.WORKER_AREAS)
    .select(SUPABASE_WORKER_COLUMN.AREA)
    .eq(SUPABASE_WORKER_COLUMN.WORKER_ID, worker.id);

  throwIfSupabaseError(
    areasError,
    SUPABASE_TABLE.WORKER_AREAS
  );

  const { data: marks, error: marksError } = await supabase
    .from(SUPABASE_TABLE.WORKER_MARKS)
    .select(SUPABASE_WORKER_COLUMN.MARK)
    .eq(SUPABASE_WORKER_COLUMN.WORKER_ID, worker.id);

  throwIfSupabaseError(
    marksError,
    SUPABASE_TABLE.WORKER_MARKS
  );

  return {
    areas: (areas ?? []).map(({ area }) => area),
    baseRole: worker.base_role,
    fullName: worker.full_name,
    id: worker.id,
    isExternalGuide: worker.is_external_guide,
    marks: (marks ?? []).map(({ mark }) => mark),
    username: worker.username,
  };
};
