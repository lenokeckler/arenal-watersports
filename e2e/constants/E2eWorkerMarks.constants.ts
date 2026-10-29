import {
  SUPABASE_WORKER_MARK,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import {
  WORKER_MARK_CHANGED_NOTICE,
  WORKER_MARK_LABEL,
} from "@/app/features/administration/worker-areas/constants/WorkerAreasCopy.constants";

export const E2E_GUIDE_LABEL =
  WORKER_MARK_LABEL[SUPABASE_WORKER_MARK.GUIDE];

export const E2E_GUIDE_PUT_NOTICE =
  WORKER_MARK_CHANGED_NOTICE[WORKER_AREA_INTENT.GRANT](
    E2E_GUIDE_LABEL
  );

export const E2E_GUIDE_REMOVED_NOTICE =
  WORKER_MARK_CHANGED_NOTICE[WORKER_AREA_INTENT.REVOKE](
    E2E_GUIDE_LABEL
  );

export const E2E_WORKER_MARKS_SQL = {
  COUNT_MARK:
    "select count(*) from public.worker_marks where worker_id = :'uid' and mark = :'mark'",
  COUNT_AREAS:
    "select count(*) from public.worker_areas where worker_id = :'uid'",
  MARK_VARIABLE: "mark",
  MARK_OPERATION: "count a mark of the worker",
  AREAS_OPERATION: "count the areas of the worker",
} as const;

export const E2E_GENERAL_MANAGER_LABEL =
  WORKER_MARK_LABEL[SUPABASE_WORKER_MARK.GENERAL_MANAGER];

export const E2E_GENERAL_MANAGER_PUT_NOTICE =
  WORKER_MARK_CHANGED_NOTICE[WORKER_AREA_INTENT.GRANT](
    E2E_GENERAL_MANAGER_LABEL
  );

export const E2E_GENERAL_MANAGER_REMOVED_NOTICE =
  WORKER_MARK_CHANGED_NOTICE[WORKER_AREA_INTENT.REVOKE](
    E2E_GENERAL_MANAGER_LABEL
  );

export const E2E_WORKER_MARKS_SCREENSHOT_BASENAME = {
  NO_MARKS: "04-worker-marks-none",
  BOTH_MARKS: "05-worker-marks-guide-and-general-manager",
} as const;
