import {
  GRANTABLE_WORKER_MARKS,
  type GrantableWorkerMark,
} from "@/app/constants";

const GRANTABLE_MARKS: readonly unknown[] =
  GRANTABLE_WORKER_MARKS;

export const isGrantableWorkerMark = (
  value: unknown
): value is GrantableWorkerMark =>
  GRANTABLE_MARKS.includes(value);
