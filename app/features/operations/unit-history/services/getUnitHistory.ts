import { readEquipmentJobs } from "@/app/services/equipment/readEquipmentJobs";
import { readEquipmentReports } from "@/app/services/equipment/readEquipmentReports";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_HISTORY_QUERY } from "../constants/UnitHistory.constants";
import type { UnitHistoryData } from "../models/UnitHistoryData.interface";

export const getUnitHistory = async (
  unitId: string
): Promise<NullableRef<UnitHistoryData>> => {
  const supabase = await getOperationsSupabaseClient();
  const { data: unit, error } = await supabase
    .from("equipment_units")
    .select(UNIT_HISTORY_QUERY.UNIT_COLUMNS)
    .eq("id", unitId)
    .neq("status", "decommissioned")
    .maybeSingle();
  throwIfSupabaseError(error, UNIT_HISTORY_QUERY.LOAD_UNIT);

  if (!unit) {
    return null;
  }

  const [jobs, reports] = await Promise.all([
    readEquipmentJobs(supabase, { unitId }),
    readEquipmentReports(supabase, { unitId }),
  ]);

  return {
    jobs,
    reports,
    unit: {
      categoryName: unit.category.name,
      code: unit.code,
      hasPhotos: unit.category.has_condition_photos,
      id: unit.id,
      impactCount: unit.impact_count,
      nextOilChangeAt:
        unit.next_oil_change_at === null
          ? null
          : Number(unit.next_oil_change_at),
      status: unit.status,
      usageMetric: unit.category.usage_metric,
      usageTotal: Number(unit.usage_total),
    },
  };
};
