import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { MaintenanceJobsState } from "./models/DispatchSheetFixture.interface";

export const readMaintenanceJobs = async (
  supabase: SupabaseClient,
  unitCodes: string[]
): Promise<MaintenanceJobsState> => {
  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id, code, next_oil_change_at")
    .in("code", unitCodes);

  if (units.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_JOBS,
      units.error.message
    );
  }

  const unitIds = (units.data ?? []).map((unit) => unit.id);
  const jobs = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.MAINTENANCE_RECORDS)
    .select(
      "unit_id, work_type, description, is_external, cost_amount, cost_currency, performed_at, created_by"
    )
    .in("unit_id", unitIds);

  if (jobs.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_JOBS,
      jobs.error.message
    );
  }

  return {
    jobs: (jobs.data ?? []).map((job) => ({
      costAmount:
        job.cost_amount === null
          ? null
          : Number(job.cost_amount),
      costCurrency: job.cost_currency,
      createdBy: job.created_by,
      description: job.description,
      isExternal: job.is_external,
      performedAt: job.performed_at,
      unitCode:
        (units.data ?? []).find(
          (unit) => unit.id === job.unit_id
        )?.code ?? "",
      workType: job.work_type,
    })),
    nextOilChangeAt: Object.fromEntries(
      (units.data ?? []).map((unit) => [
        unit.code,
        unit.next_oil_change_at === null
          ? null
          : Number(unit.next_oil_change_at),
      ])
    ),
  };
};
