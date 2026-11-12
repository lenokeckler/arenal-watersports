import {
  PAGINATION,
  PATHS,
  WORKER_LIST_QUERY_PARAMETER,
} from "@/app/constants";
import type { WorkerListSearch } from "@/app/services/worker-list/models/WorkerListSearch.interface";

export const resolveWorkerListPageHref = (
  pageIndex: number,
  search: WorkerListSearch
): string => {
  const parameters = new URLSearchParams();

  if (search.baseRole) {
    parameters.set(
      WORKER_LIST_QUERY_PARAMETER.ROLE,
      search.baseRole
    );
  }
  if (search.status) {
    parameters.set(
      WORKER_LIST_QUERY_PARAMETER.STATUS,
      search.status
    );
  }
  if (pageIndex > PAGINATION.DEFAULT_PAGE) {
    parameters.set(
      PAGINATION.QUERY_PARAMS.PAGE,
      `${pageIndex}`
    );
  }

  const query = parameters.toString();

  return query
    ? `${PATHS.ADMINISTRATION.WORKERS}?${query}`
    : PATHS.ADMINISTRATION.WORKERS;
};
