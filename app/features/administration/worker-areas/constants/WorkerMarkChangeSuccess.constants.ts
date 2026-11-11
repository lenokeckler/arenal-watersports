import {
  WORKER_MARK_CHANGE_RESULT,
  type WorkerMarkChangeResult,
} from "@/app/constants";

export const WORKER_MARK_CHANGE_SUCCESSES: readonly WorkerMarkChangeResult[] =
  [
    WORKER_MARK_CHANGE_RESULT.GRANTED,
    WORKER_MARK_CHANGE_RESULT.REVOKED,
  ];
