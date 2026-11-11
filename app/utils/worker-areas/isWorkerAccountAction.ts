import {
  WORKER_ACCOUNT_ACTION,
  type WorkerAccountAction,
} from "@/app/constants";

const ACTIONS: readonly unknown[] = Object.values(
  WORKER_ACCOUNT_ACTION
);

export const isWorkerAccountAction = (
  value: unknown
): value is WorkerAccountAction => ACTIONS.includes(value);
