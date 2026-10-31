import {
  PAGINATION,
  SUPABASE_WORKER_STATUS,
  WORKER_LIST_QUERY,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerListRowsResult } from "./models/WorkerListRowsResult.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerListSearch } from "./models/WorkerListSearch.interface";

const createWorkerListQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
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

export const buildWorkerQuery = (
  supabase: ServerSupabaseClient,
  search: WorkerListSearch,
  asOf: string
): ReturnType<typeof createWorkerListQuery> => {
  let query = createWorkerListQuery(supabase);

  if (search.baseRole) {
    query = query.eq(
      WORKER_LIST_QUERY.COLUMN.BASE_ROLE,
      search.baseRole
    );
  }
  if (search.status === WORKER_LIST_STATUS.ACTIVE) {
    query = query
      .eq(
        WORKER_LIST_QUERY.COLUMN.STATUS,
        SUPABASE_WORKER_STATUS.ACTIVE
      )
      .is(WORKER_LIST_QUERY.COLUMN.DELETED_AT, null)
      .or(
        `${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.IS_NULL},${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.EXPIRES_AT_AFTER}${asOf}`
      );
  }
  if (search.status === WORKER_LIST_STATUS.INACTIVE) {
    query = query.or(
      `${WORKER_LIST_QUERY.COLUMN.STATUS}.${WORKER_LIST_QUERY.OPERATOR.NOT_EQUAL}${SUPABASE_WORKER_STATUS.ACTIVE},${WORKER_LIST_QUERY.COLUMN.DELETED_AT}.${WORKER_LIST_QUERY.OPERATOR.IS_NOT_NULL},${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.EXPIRES_AT_BEFORE_OR_ON}${asOf}`
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
