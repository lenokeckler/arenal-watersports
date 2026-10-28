import {
  PATHS,
  WORKER_AREA_FIELD,
  type GrantableWorkerArea,
  type WorkerAreaIntent,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";

export const buildWorkerAreasPath = (
  username: string
): string =>
  appendQueryParam(
    PATHS.ADMINISTRATION.WORKER_AREAS,
    WORKER_AREA_FIELD.USERNAME,
    username
  );

export const buildWorkerAreaChangedPath = (
  username: string,
  intent: WorkerAreaIntent,
  area: GrantableWorkerArea
): string =>
  appendQueryParam(
    appendQueryParam(
      buildWorkerAreasPath(username),
      WORKER_AREA_FIELD.NOTICE,
      intent
    ),
    WORKER_AREA_FIELD.AREA,
    area
  );
