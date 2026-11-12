import { WORKER_ACCOUNT_RESULT } from "@/app/constants";
import {
  WORKER_ACCOUNT_ERROR,
  WORKER_ACCOUNT_NOTICE,
} from "@/app/features/administration/worker-areas/constants/WorkerAccountCopy.constants";
import { WORKER_EXPIRY_COPY } from "@/app/features/administration/worker-areas/constants/WorkerExpiryCopy.constants";

export const E2E_WORKER_EXPIRY = {
  EXPIRED_AT: "2026-01-15T05:59:59.000Z",
  EXPIRED_NOTE: /Caducó el .+: la cuenta no puede entrar\./,
  EXPIRES_NOTE: /Caduca el .+\./,
  EXTENDED_NOTICE:
    WORKER_ACCOUNT_NOTICE[WORKER_ACCOUNT_RESULT.EXTENDED] ??
    "",
  FULL_NAME: "Guia vencida",
  INVALID_DATE_ERROR:
    WORKER_ACCOUNT_ERROR[
      WORKER_ACCOUNT_RESULT.INVALID_DATE
    ],
  DATE_LABEL: WORKER_EXPIRY_COPY.DATE_LABEL,
  EXTEND_LABEL: WORKER_EXPIRY_COPY.EXTEND,
  PAST_DATE: "2026-01-20",
  DAYS_AHEAD: 30,
  MILLISECONDS_PER_DAY: 86_400_000,
  DATE_LENGTH: 10,
} as const;

export const E2E_WORKER_EXPIRY_SCREENSHOT_BASENAME = {
  EXPIRED: "07-worker-expiry-expired-guide",
  EXTENDED: "08-worker-expiry-extended-guide",
} as const;
