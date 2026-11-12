import type { NullableRef } from "@/app/types";
import { WORKER_EXPIRY } from "../constants/WorkerExpiry.constants";

const isCalendarDate = (date: string): boolean => {
  const [year, month, day] = date.split("-").map(Number);
  const probe = new Date(
    Date.UTC(
      year,
      month - WORKER_EXPIRY.MONTH_INDEX_OFFSET,
      day
    )
  );

  return (
    probe.getUTCFullYear() === year &&
    probe.getUTCMonth() ===
      month - WORKER_EXPIRY.MONTH_INDEX_OFFSET &&
    probe.getUTCDate() === day
  );
};

export const buildWorkerExpiryTimestamp = (
  date: string
): NullableRef<string> =>
  WORKER_EXPIRY.DATE_PATTERN.test(date) &&
  isCalendarDate(date)
    ? `${date}${WORKER_EXPIRY.END_OF_DAY_SUFFIX}`
    : null;
