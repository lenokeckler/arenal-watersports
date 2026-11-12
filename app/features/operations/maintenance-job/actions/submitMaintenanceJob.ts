"use server";

import type { MaintenanceJobInput } from "../models/MaintenanceJobInput.interface";
import type { MaintenanceJobResult } from "../models/MaintenanceJobResult.interface";
import { registerMaintenanceJob } from "../services/registerMaintenanceJob";

export const submitMaintenanceJob = async (
  input: MaintenanceJobInput
): Promise<MaintenanceJobResult> => {
  const result = await registerMaintenanceJob(input);

  return result;
};
