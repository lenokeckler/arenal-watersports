import {
  SUPABASE_WORK_AREA,
  WORK_AREA_LABEL,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import {
  WORKER_AREA_CHANGED_NOTICE,
  WORKER_AREAS_COPY,
} from "@/app/features/administration/worker-areas/constants/WorkerAreasCopy.constants";

export const E2E_WORKER_AREAS_COPY = WORKER_AREAS_COPY;

export const E2E_RESERVATIONS_LABEL =
  WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS];

export const E2E_RESERVATIONS_GRANTED_NOTICE =
  WORKER_AREA_CHANGED_NOTICE[WORKER_AREA_INTENT.GRANT](
    E2E_RESERVATIONS_LABEL
  );

export const E2E_RESERVATIONS_REVOKED_NOTICE =
  WORKER_AREA_CHANGED_NOTICE[WORKER_AREA_INTENT.REVOKE](
    E2E_RESERVATIONS_LABEL
  );

export const E2E_WORKER_AREAS_SQL = {
  HAS_RESERVATIONS:
    "select count(*) from public.worker_areas where worker_id = :'uid' and area = 'reservas'",
  OPERATION: "count the reservations area of the worker",
} as const;

export const E2E_UNKNOWN_USERNAME = "nadie_registrado";

export const E2E_WORKER_AREAS_SCREENSHOT_BASENAME = {
  LOOKUP: "01-worker-areas-lookup",
  WORKER: "02-worker-areas-worker",
  GRANTED: "03-worker-areas-granted",
} as const;
