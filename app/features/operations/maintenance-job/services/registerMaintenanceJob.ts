import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  MAINTENANCE_JOB_DATABASE_ERROR,
  MAINTENANCE_JOB_ERROR,
  MAINTENANCE_JOB_STATUS,
} from "../constants/MaintenanceJob.constants";
import type { MaintenanceJobInput } from "../models/MaintenanceJobInput.interface";
import type { MaintenanceJobResult } from "../models/MaintenanceJobResult.interface";
import { validateMaintenanceJobInput } from "../utils/validateMaintenanceJobInput";

const INVALID_CODES: readonly string[] = [
  MAINTENANCE_JOB_DATABASE_ERROR.INVALID_JOB,
  MAINTENANCE_JOB_DATABASE_ERROR.INVALID_VALUE,
];

export const registerMaintenanceJob = async (
  input: MaintenanceJobInput
): Promise<MaintenanceJobResult> => {
  validateMaintenanceJobInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    "register_maintenance_job",
    {
      p_cost_amount: input.costAmount ?? undefined,
      p_cost_currency: input.costCurrency ?? undefined,
      p_description: input.description.trim(),
      p_is_external: input.isExternal,
      p_next_oil_change_at:
        input.nextOilChangeAt ?? undefined,
      p_performed_at: input.performedAt,
      p_unit_id: input.unitId,
      p_work_type: input.workType,
    }
  );

  if (!error) {
    return { status: MAINTENANCE_JOB_STATUS.REGISTERED };
  }

  if (
    error.code ===
    MAINTENANCE_JOB_DATABASE_ERROR.UNIT_RETIRED
  ) {
    return { status: MAINTENANCE_JOB_STATUS.UNIT_RETIRED };
  }

  if (INVALID_CODES.includes(error.code)) {
    return { status: MAINTENANCE_JOB_STATUS.INVALID };
  }

  throw new SupabaseQueryError(
    MAINTENANCE_JOB_ERROR.REGISTER_JOB,
    error
  );
};
