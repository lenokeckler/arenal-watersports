import {
  GRANTABLE_WORKER_AREAS,
  type GrantableWorkerArea,
} from "@/app/constants";

const GRANTABLE_AREAS: readonly unknown[] =
  GRANTABLE_WORKER_AREAS;

export const isGrantableWorkerArea = (
  value: unknown
): value is GrantableWorkerArea =>
  GRANTABLE_AREAS.includes(value);
