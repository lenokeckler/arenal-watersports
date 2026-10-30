import { PAGINATION } from "@/app/constants";
import { WORKER_LIST_STATUS } from "@/app/constants/administration/WorkerList.constants";
import { SUPABASE_WORKER_STATUS } from "@/app/constants/supabase/SupabaseWorkerStatus.constants";
import { WORKER_LIST_QUERY } from "@/app/constants/supabase/WorkerListQuery.constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerListRowsResult } from "./models/WorkerListRowsResult.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerListSearch } from "./models/WorkerListSearch.interface";

export const buildWorkerQuery = (
  supabase: ServerSupabaseClient,
  search: WorkerListSearch,
  asOf: string
) => {
  const query = supabase
    .from(WORKER_LIST_QUERY.TABLES.WORKERS)
    .select(WORKER_LIST_QUERY.WORKERS_PROJECTION, {
      count: WORKER_LIST_QUERY.COUNT,
    })
    .order(WORKER_LIST_QUERY.ORDER_BY.FULL_NAME, {
      ascending: true,
    })
    .order(WORKER_LIST_QUERY.ORDER_BY.ID, {
      ascending: true,
    });

  if (search.baseRole) {
    query.eq(
      WORKER_LIST_QUERY.COLUMN.BASE_ROLE,
      search.baseRole
    );
  }
  if (search.status === WORKER_LIST_STATUS.ACTIVE) {
    query
      .eq(
        WORKER_LIST_QUERY.COLUMN.STATUS,
        SUPABASE_WORKER_STATUS.ACTIVE
      )
      .is(WORKER_LIST_QUERY.COLUMN.DELETED_AT, null)
      .or(
        `${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.is.null,${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.gt.${asOf}`
      );
  }
  if (search.status === WORKER_LIST_STATUS.INACTIVE) {
    query.or(
      `${WORKER_LIST_QUERY.COLUMN.STATUS}.neq.${SUPABASE_WORKER_STATUS.ACTIVE},${WORKER_LIST_QUERY.COLUMN.DELETED_AT}.not.is.null,${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.lte.${asOf}`
    );
  }

  return query;
};

export const readWorkerRows = async (
  supabase: ServerSupabaseClient,
  search: WorkerListSearch,
  pageIndex: number,
  asOf: string
): Promise<WorkerListRowsResult> => {
  const from = pageIndex * PAGINATION.DEFAULT_PAGE_SIZE;
  const to =
    from +
    PAGINATION.DEFAULT_PAGE_SIZE -
    PAGINATION.ONE_PAGE;
  const response = await buildWorkerQuery(
    supabase,
    search,
    asOf
  ).range(from, to);
  throwIfSupabaseError(
    response.error,
    WORKER_LIST_QUERY.TABLES.WORKERS
  );
  return {
    count: response.count,
    rows: response.data ?? [],
  };
};
