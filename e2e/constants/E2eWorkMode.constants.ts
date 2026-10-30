import {
  SUPABASE_WORK_AREA,
  WORK_AREA_LABEL,
} from "@/app/constants";
import { WORK_MODE_COPY } from "@/app/features/access/work-mode/constants/WorkModeCopy.constants";

export const E2E_WORK_MODE_COPY = WORK_MODE_COPY;

export const E2E_RESERVATIONS_AREA_LABEL =
  WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS];

export const E2E_OPERATIONS_AREA_LABEL =
  WORK_AREA_LABEL[SUPABASE_WORK_AREA.OPERATIONS];

export const E2E_WORK_MODE_SQL = {
  ADD_RESERVATIONS:
    "insert into public.worker_areas (worker_id, area, granted_by) select :'uid', 'reservas', id from public.workers where base_role = 'administracion'",
  ADD_OPERATIONS:
    "insert into public.worker_areas (worker_id, area, granted_by) select :'uid', 'operaciones', id from public.workers where base_role = 'administracion' on conflict (worker_id, area) do nothing",
  ADD_OPERATION: "give the worker the reservations area",
  ADD_OPERATIONS_OPERATION:
    "give the worker the operations area",
  READ_MODE:
    "select coalesce(last_work_area::text, '') from public.workers where id = :'uid'",
  READ_OPERATION: "read the last work mode of the worker",
} as const;

export const E2E_WORK_MODE_SCREENSHOT_BASENAME = {
  SELECTOR: "01-work-mode-selector",
  HOME_WITH_SWITCH: "02-work-mode-home-with-switch",
  SELECTOR_WITH_CURRENT: "03-work-mode-selector-current",
} as const;
