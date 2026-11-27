import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobLoad } from "../models/MaintenanceJobLoad.interface";
import { getMaintenanceJobUnits } from "./getMaintenanceJobUnits";

export const loadMaintenanceJobUnits =
  async (): Promise<MaintenanceJobLoad> => {
    try {
      return {
        errorMessage: null,
        units: await getMaintenanceJobUnits(),
      };
    } catch (error) {
      return {
        errorMessage:
          error instanceof OperationsAccessError
            ? MAINTENANCE_JOB_COPY.FORBIDDEN
            : MAINTENANCE_JOB_COPY.ERROR_LOAD,
        units: [],
      };
    }
  };
