import { PAGINATION } from "@/app/constants";
import {
  WORKER_LIST_BASE_ROLES,
  WORKER_LIST_PAGE_PATTERN,
  WORKER_LIST_QUERY_PARAMETER,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import type { WorkerListBaseRole } from "../models/WorkerListBaseRole.type";
import type { WorkerListStatus } from "../models/WorkerListStatus.type";
import type { WorkerListSearch } from "../models/WorkerListSearch.interface";
import type { WorkerListSearchParameters } from "../models/WorkerListSearchParameters.type";
import type { NullableUndefined } from "@/app/types";

const readSingleValue = (
  value: NullableUndefined<string | string[]>
): NullableUndefined<string> =>
  typeof value === "string" ? value : undefined;

const resolveBaseRole = (
  value: NullableUndefined<string>
): NullableUndefined<WorkerListBaseRole> =>
  WORKER_LIST_BASE_ROLES.find(
    (baseRole) => baseRole === value
  );

const resolveStatus = (
  value: NullableUndefined<string>
): NullableUndefined<WorkerListStatus> =>
  Object.values(WORKER_LIST_STATUS).find(
    (status) => status === value
  );

const resolvePageIndex = (
  value: NullableUndefined<string>
): number => {
  if (!value || !WORKER_LIST_PAGE_PATTERN.test(value)) {
    return PAGINATION.DEFAULT_PAGE;
  }

  const pageIndex = Number(value);

  return Number.isSafeInteger(pageIndex)
    ? pageIndex
    : PAGINATION.DEFAULT_PAGE;
};

export const resolveWorkerListSearch = (
  searchParameters: WorkerListSearchParameters
): WorkerListSearch => ({
  baseRole: resolveBaseRole(
    readSingleValue(
      searchParameters[WORKER_LIST_QUERY_PARAMETER.ROLE]
    )
  ),
  pageIndex: resolvePageIndex(
    readSingleValue(
      searchParameters[WORKER_LIST_QUERY_PARAMETER.PAGE]
    )
  ),
  status: resolveStatus(
    readSingleValue(
      searchParameters[WORKER_LIST_QUERY_PARAMETER.STATUS]
    )
  ),
});
