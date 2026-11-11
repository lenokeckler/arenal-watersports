import {
  SUPABASE_WORKER_BLOCKED_REASON,
  WORKER_ACCOUNT_STATE,
  type WorkerAccountState,
} from "@/app/constants";
import type { WorkerAccountRow } from "./models/WorkerAccountRow.interface";

export const resolveWorkerAccountState = ({
  blocked_reason,
  deleted_at,
}: WorkerAccountRow): WorkerAccountState => {
  if (deleted_at) {
    return WORKER_ACCOUNT_STATE.RETIRED;
  }

  if (
    blocked_reason ===
    SUPABASE_WORKER_BLOCKED_REASON.FAILED_ATTEMPTS
  ) {
    return WORKER_ACCOUNT_STATE.BLOCKED_BY_ATTEMPTS;
  }

  return blocked_reason ===
    SUPABASE_WORKER_BLOCKED_REASON.ADMINISTRATION
    ? WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION
    : WORKER_ACCOUNT_STATE.ACTIVE;
};
