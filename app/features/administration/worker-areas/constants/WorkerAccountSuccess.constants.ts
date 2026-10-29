import {
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_RESULT,
  type WorkerAccountAction,
  type WorkerAccountResult,
} from "@/app/constants";

export const WORKER_ACCOUNT_SUCCESS_BY_ACTION: Record<
  WorkerAccountAction,
  WorkerAccountResult
> = {
  [WORKER_ACCOUNT_ACTION.BLOCK]:
    WORKER_ACCOUNT_RESULT.BLOCKED,
  [WORKER_ACCOUNT_ACTION.RETIRE]:
    WORKER_ACCOUNT_RESULT.RETIRED,
  [WORKER_ACCOUNT_ACTION.UNLOCK]:
    WORKER_ACCOUNT_RESULT.UNLOCKED,
};

export const WORKER_ACCOUNT_SUCCESSES: readonly WorkerAccountResult[] =
  Object.values(WORKER_ACCOUNT_SUCCESS_BY_ACTION);
