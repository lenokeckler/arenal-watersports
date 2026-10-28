import {
  WORKER_ACCOUNT_RESULT,
  type WorkerAccountResult,
} from "@/app/constants";

export const WORKER_ACCOUNT_SUCCESSES: readonly WorkerAccountResult[] =
  [
    WORKER_ACCOUNT_RESULT.BLOCKED,
    WORKER_ACCOUNT_RESULT.UNLOCKED,
  ];
