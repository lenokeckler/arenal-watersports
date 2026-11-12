import {
  STRING,
  WORKER_LIST_BASE_ROLES,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import {
  WORKER_LIST_COPY,
  WORKER_LIST_ROLE_LABEL,
  WORKER_LIST_STATUS_LABEL,
} from "./WorkerListCopy.constants";

const workerListAllFilterOption = {
  key: WORKER_LIST_COPY.FILTER_ALL,
  label: WORKER_LIST_COPY.FILTER_ALL,
  value: STRING.Empty,
} as const;

export const WORKER_LIST_ROLE_FILTER_OPTIONS = [
  workerListAllFilterOption,
  ...WORKER_LIST_BASE_ROLES.map((role) => ({
    key: role,
    label: WORKER_LIST_ROLE_LABEL[role],
    value: role,
  })),
] as const;

export const WORKER_LIST_STATUS_FILTER_OPTIONS = [
  workerListAllFilterOption,
  ...Object.values(WORKER_LIST_STATUS).map((status) => ({
    key: status,
    label: WORKER_LIST_STATUS_LABEL[status],
    value: status,
  })),
] as const;
