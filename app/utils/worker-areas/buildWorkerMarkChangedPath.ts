import {
  WORKER_MARK_FIELD,
  type GrantableWorkerMark,
  type WorkerAreaIntent,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { buildWorkerAreasPath } from "./buildWorkerAreasPath";

export const buildWorkerMarkChangedPath = (
  username: string,
  intent: WorkerAreaIntent,
  mark: GrantableWorkerMark
): string =>
  appendQueryParam(
    appendQueryParam(
      buildWorkerAreasPath(username),
      WORKER_MARK_FIELD.MARK_NOTICE,
      intent
    ),
    WORKER_MARK_FIELD.MARK,
    mark
  );
