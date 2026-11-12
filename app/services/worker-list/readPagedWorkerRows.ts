import { PAGINATION } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { PagedWorkerRows } from "./models/PagedWorkerRows.interface";
import type { WorkerListSearch } from "./models/WorkerListSearch.interface";
import { readWorkerRows } from "./readWorkerRows";

export const readPagedWorkerRows = async (
  supabase: ServerSupabaseClient,
  search: WorkerListSearch,
  asOf: string
): Promise<PagedWorkerRows> => {
  const firstPage = await readWorkerRows(
    supabase,
    search,
    PAGINATION.DEFAULT_PAGE,
    asOf
  );
  const totalCount =
    firstPage.count ?? PAGINATION.ZERO_RESULTS;
  const pageCount = Math.max(
    PAGINATION.ONE_PAGE,
    Math.ceil(totalCount / PAGINATION.DEFAULT_PAGE_SIZE)
  );
  const pageIndex = Math.min(
    search.pageIndex,
    pageCount - PAGINATION.ONE_PAGE
  );
  const rows =
    pageIndex === PAGINATION.DEFAULT_PAGE
      ? firstPage.rows
      : (
          await readWorkerRows(
            supabase,
            search,
            pageIndex,
            asOf
          )
        ).rows;

  return { pageCount, pageIndex, rows, totalCount };
};
