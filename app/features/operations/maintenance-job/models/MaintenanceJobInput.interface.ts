import type {
  MAINTENANCE_JOB_CURRENCY,
  MAINTENANCE_JOB_WORK_TYPE,
} from "../constants/MaintenanceJob.constants";
import type { NullableRef } from "@/app/types";

export type MaintenanceJobWorkType =
  (typeof MAINTENANCE_JOB_WORK_TYPE)[keyof typeof MAINTENANCE_JOB_WORK_TYPE];

export type MaintenanceJobCurrency =
  (typeof MAINTENANCE_JOB_CURRENCY)[keyof typeof MAINTENANCE_JOB_CURRENCY];

export interface MaintenanceJobInput {
  costAmount: NullableRef<number>;
  costCurrency: NullableRef<MaintenanceJobCurrency>;
  description: string;
  isExternal: boolean;
  nextOilChangeAt: NullableRef<number>;
  performedAt: string;
  unitId: string;
  workType: MaintenanceJobWorkType;
}
