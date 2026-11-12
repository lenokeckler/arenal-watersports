import type { NullableRef } from "@/app/types";
import {
  WORKER_EXPIRY,
  WORKER_EXPIRY_STATUS,
  type WorkerExpiryStatus,
} from "../constants/WorkerExpiry.constants";

export const resolveWorkerExpiryStatus = (
  expiresAt: NullableRef<string>,
  now: Date
): WorkerExpiryStatus => {
  const expiry =
    expiresAt === null ? Number.NaN : Date.parse(expiresAt);

  if (Number.isNaN(expiry)) {
    return WORKER_EXPIRY_STATUS.NONE;
  }

  const remaining = expiry - now.getTime();

  if (remaining <= 0) {
    return WORKER_EXPIRY_STATUS.EXPIRED;
  }

  return remaining <=
    WORKER_EXPIRY.WARNING_DAYS *
      WORKER_EXPIRY.MILLISECONDS_PER_DAY
    ? WORKER_EXPIRY_STATUS.EXPIRING
    : WORKER_EXPIRY_STATUS.VALID;
};
