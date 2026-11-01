import { PAGINATION } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerListPage } from "./models/WorkerListPage.interface";
import type { WorkerListSearch } from "./models/WorkerListSearch.interface";
import { mapWorkerListRows } from "./utils/mapWorkerListRows";
import { readPagedWorkerRows } from "./readPagedWorkerRows";
import { readWorkerDetails } from "./readWorkerDetails";

export const readWorkerListPageData = async (
  supabase: ServerSupabaseClient,
  search: WorkerListSearch,
  asOf: string
): Promise<WorkerListPage> => {
  const pageData = await readPagedWorkerRows(
    supabase,
    search,
    asOf
  );

  if (pageData.rows.length === PAGINATION.ZERO_RESULTS) {
    return { ...pageData, items: [] };
  }

  const workerDetails = await readWorkerDetails(
    supabase,
    pageData.rows.map(({ id }) => id)
  );
  const items = mapWorkerListRows({
    areas: workerDetails.areas,
    asOf,
    marks: workerDetails.marks,
    workers: pageData.rows,
  });

  return { ...pageData, items };
};
