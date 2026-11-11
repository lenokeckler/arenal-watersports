import type { MAINTENANCE_JOB_STATUS } from "../constants/MaintenanceJob.constants";

export interface MaintenanceJobResult {
  status: (typeof MAINTENANCE_JOB_STATUS)[keyof typeof MAINTENANCE_JOB_STATUS];
}
