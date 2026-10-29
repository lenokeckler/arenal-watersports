import {
  WORKER_AREA_CHANGE_RESULT,
  type WorkerAreaChangeResult,
} from "@/app/constants";

export const WORKER_AREA_CHANGE_SUCCESSES: readonly WorkerAreaChangeResult[] =
  [
    WORKER_AREA_CHANGE_RESULT.GRANTED,
    WORKER_AREA_CHANGE_RESULT.REVOKED,
  ];
