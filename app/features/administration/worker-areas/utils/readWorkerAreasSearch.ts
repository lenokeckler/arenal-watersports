import {
  GRANTABLE_WORKER_AREAS,
  STRING,
  WORKER_AREA_FIELD,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";
import type { WorkerAreasQuery } from "../models/WorkerAreasQuery.type";
import type { WorkerAreasSearch } from "../models/WorkerAreasSearch.interface";

const readUsername = (
  value: WorkerAreasQuery[string]
): string =>
  typeof value === "string"
    ? normalizeUsername(value)
    : STRING.Empty;

export const readWorkerAreasSearch = (
  query: WorkerAreasQuery
): WorkerAreasSearch => ({
  area: resolveQueryChoice(
    query[WORKER_AREA_FIELD.AREA],
    GRANTABLE_WORKER_AREAS
  ),
  notice: resolveQueryChoice(
    query[WORKER_AREA_FIELD.NOTICE],
    Object.values(WORKER_AREA_INTENT)
  ),
  username: readUsername(query[WORKER_AREA_FIELD.USERNAME]),
});
