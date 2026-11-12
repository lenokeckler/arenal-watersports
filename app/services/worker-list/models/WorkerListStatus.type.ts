import { WORKER_LIST_STATUS } from "@/app/constants";

export type WorkerListStatus =
  (typeof WORKER_LIST_STATUS)[keyof typeof WORKER_LIST_STATUS];
