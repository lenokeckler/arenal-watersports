import {
  WORKER_ACCOUNT_FIELD,
  type WorkerAccountResult,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { buildWorkerAreasPath } from "./buildWorkerAreasPath";

export const buildWorkerAccountChangedPath = (
  username: string,
  result: WorkerAccountResult
): string =>
  appendQueryParam(
    buildWorkerAreasPath(username),
    WORKER_ACCOUNT_FIELD.ACCOUNT_NOTICE,
    result
  );
