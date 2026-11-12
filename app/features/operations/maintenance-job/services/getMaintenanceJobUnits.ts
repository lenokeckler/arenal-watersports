import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  MAINTENANCE_JOB_ERROR,
  MAINTENANCE_JOB_LIMITS,
} from "../constants/MaintenanceJob.constants";
import type { MaintenanceJobUnit } from "../models/MaintenanceJobUnit.interface";

export const getMaintenanceJobUnits = async (): Promise<
  MaintenanceJobUnit[]
> => {
  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase
    .from("equipment_units")
    .select(
      "id, code, usage_total, category:equipment_categories(name, usage_metric)"
    )
    .neq("status", "decommissioned")
    .order("code")
    .limit(MAINTENANCE_JOB_LIMITS.UNITS_MAX);
  throwIfSupabaseError(
    error,
    MAINTENANCE_JOB_ERROR.LOAD_UNITS
  );

  return (data ?? []).map((row) => ({
    categoryName: row.category?.name ?? "",
    code: row.code,
    unitId: row.id,
    usageMetric: row.category?.usage_metric ?? null,
    usageTotal: Number(row.usage_total),
  }));
};
