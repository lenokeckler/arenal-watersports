import {
  WORKER_ACCOUNT_RESULT,
  type WorkerAccountResult,
} from "@/app/constants";

const RESULTS: readonly unknown[] = Object.values(
  WORKER_ACCOUNT_RESULT
);

export const isWorkerAccountResult = (
  value: unknown
): value is WorkerAccountResult => RESULTS.includes(value);
