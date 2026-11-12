import { WORKER_LIST_QUERY } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerListDetails } from "./models/WorkerListDetails.interface";

export const readWorkerDetails = async (
  supabase: ServerSupabaseClient,
  workerIds: string[]
): Promise<WorkerListDetails> => {
  const [areasResponse, marksResponse] = await Promise.all([
    supabase
      .from(WORKER_LIST_QUERY.TABLES.AREAS)
      .select(WORKER_LIST_QUERY.WORKER_AREAS_PROJECTION)
      .in(WORKER_LIST_QUERY.COLUMN.WORKER_ID, workerIds),
    supabase
      .from(WORKER_LIST_QUERY.TABLES.MARKS)
      .select(WORKER_LIST_QUERY.WORKER_MARKS_PROJECTION)
      .in(WORKER_LIST_QUERY.COLUMN.WORKER_ID, workerIds),
  ]);

  throwIfSupabaseError(
    areasResponse.error,
    WORKER_LIST_QUERY.TABLES.AREAS
  );
  throwIfSupabaseError(
    marksResponse.error,
    WORKER_LIST_QUERY.TABLES.MARKS
  );

  return {
    areas: areasResponse.data ?? [],
    marks: marksResponse.data ?? [],
  };
};
