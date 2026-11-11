import {
  WORKER_AREA_INTENT,
  type GrantableWorkerMark,
} from "@/app/constants";
import type { WorkerAreasOverview } from "@/app/services/worker-areas/models/WorkerAreasOverview.interface";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";
import type { WorkerMarkStatus } from "../models/WorkerMarkStatus.interface";

export const resolveWorkerMarkStatus = (
  { marks }: WorkerAreasOverview,
  mark: GrantableWorkerMark
): WorkerMarkStatus =>
  marks.includes(mark)
    ? {
        intent: WORKER_AREA_INTENT.REVOKE,
        label: WORKER_AREAS_COPY.MARK_SET,
      }
    : {
        intent: WORKER_AREA_INTENT.GRANT,
        label: WORKER_AREAS_COPY.MARK_NOT_SET,
      };
