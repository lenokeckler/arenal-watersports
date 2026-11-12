import { WORKER_EXPIRY } from "../constants/WorkerExpiry.constants";

export const formatWorkerExpiryDate = (
  expiresAt: string
): string =>
  new Intl.DateTimeFormat(WORKER_EXPIRY.LOCALE, {
    dateStyle: "long",
    timeZone: WORKER_EXPIRY.TIME_ZONE,
  }).format(new Date(expiresAt));
