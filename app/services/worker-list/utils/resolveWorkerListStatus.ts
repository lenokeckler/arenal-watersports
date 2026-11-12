import {
  SUPABASE_WORKER_STATUS,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import type { WorkerListStatus } from "../models/WorkerListStatus.type";
import type { WorkerListWorkerRow } from "../models/WorkerListWorkerRow.type";

export const resolveWorkerListStatus = (
  worker: WorkerListWorkerRow,
  asOf: string
): WorkerListStatus => {
  const expiresAt = worker.expires_at
    ? Date.parse(worker.expires_at)
    : null;
  const asOfInstant = Date.parse(asOf);
  const isExpired =
    expiresAt !== null &&
    (!Number.isFinite(expiresAt) ||
      expiresAt <= asOfInstant);

  return worker.status === SUPABASE_WORKER_STATUS.ACTIVE &&
    worker.deleted_at === null &&
    !isExpired
    ? WORKER_LIST_STATUS.ACTIVE
    : WORKER_LIST_STATUS.INACTIVE;
};
