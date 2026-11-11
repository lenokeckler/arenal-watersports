import {
  WORKER_AREA_INTENT,
  type GrantableWorkerArea,
} from "@/app/constants";
import type { WorkerAreasOverview } from "@/app/services/worker-areas/models/WorkerAreasOverview.interface";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreaStatus } from "../models/WorkerAreaStatus.interface";

export const resolveWorkerAreaStatus = (
  { areas, baseRole }: WorkerAreasOverview,
  area: GrantableWorkerArea
): WorkerAreaStatus => {
  if (baseRole === area) {
    return {
      intent: null,
      label: WORKER_AREAS_COPY.AREA_IS_BASE,
    };
  }

  return areas.includes(area)
    ? {
        intent: WORKER_AREA_INTENT.REVOKE,
        label: WORKER_AREAS_COPY.AREA_ENABLED,
      }
    : {
        intent: WORKER_AREA_INTENT.GRANT,
        label: WORKER_AREAS_COPY.AREA_NOT_ENABLED,
      };
};
