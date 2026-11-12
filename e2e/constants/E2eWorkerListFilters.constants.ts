import {
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_MARK,
  STRING,
} from "@/app/constants";
import { WORKER_LIST_COPY } from "@/app/features/administration/worker-list/constants/WorkerListCopy.constants";

export const E2E_WORKER_LIST_FILTER_GUIDES = {
  ACTIVE: {
    EXPIRES_AT: "2099-01-01T00:00:00.000Z",
    FULL_NAME: "Active external guide E2E",
  },
  EXPIRED: {
    EXPIRES_AT: "2000-01-01T00:00:00.000Z",
    FULL_NAME: "Expired external guide E2E",
  },
  MARK: SUPABASE_WORKER_MARK.EXTERNAL_GUIDE_REGISTRATION,
} as const;

export const E2E_WORKER_LIST_FILTER_RESERVATIONS_WORKER = {
  BASE_ROLE: SUPABASE_WORK_AREA.RESERVATIONS,
  FULL_NAME: "Reservations worker E2E",
} as const;

export const E2E_WORKER_LIST_FILTER_PASSWORD =
  "E2e.Worker.Filter.2026!";

export const E2E_WORKER_LIST_FILTER_STATUS_SEPARATOR = [
  STRING.SPACE,
  STRING.MIDDLE_DOT,
  STRING.SPACE,
].join(STRING.Empty);

export const E2E_WORKER_LIST_FILTER_COLUMN = {
  BASE_ROLE: "base_role",
  FULL_NAME: "full_name",
  GRANTED_BY: "granted_by",
  IS_EXTERNAL_GUIDE: "is_external_guide",
  NATIONAL_ID: "national_id",
} as const;

export const E2E_WORKER_LIST_FILTER_GUIDE_STATUS = {
  ACTIVE: [
    WORKER_LIST_COPY.EXTERNAL_GUIDE,
    WORKER_LIST_COPY.TEMPORARY_GUIDE_ACTIVE,
  ].join(E2E_WORKER_LIST_FILTER_STATUS_SEPARATOR),
  INACTIVE: [
    WORKER_LIST_COPY.EXTERNAL_GUIDE,
    WORKER_LIST_COPY.TEMPORARY_GUIDE_INACTIVE,
  ].join(E2E_WORKER_LIST_FILTER_STATUS_SEPARATOR),
} as const;

export const E2E_WORKER_LIST_FILTER_SELECTORS = {
  CARD: "article",
} as const;
