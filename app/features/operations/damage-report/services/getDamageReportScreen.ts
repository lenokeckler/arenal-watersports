import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import type { DamageReportScreen } from "../models/DamageReportScreen.interface";
import { readDamageReportUnits } from "./readDamageReportUnits";
import { readPendingDamageReport } from "./readPendingDamageReport";

export const getDamageReportScreen = async (
  unitId: NullableRef<string>,
  reportId: NullableRef<string>
): Promise<NullableRef<DamageReportScreen>> => {
  const supabase = await getOperationsSupabaseClient();
  const units = await readDamageReportUnits(supabase);

  if (!reportId) {
    const isListed = units.some(
      (unit) => unit.id === unitId
    );

    return {
      pending: null,
      presetUnitId: isListed ? unitId : null,
      units,
    };
  }

  const pending = await readPendingDamageReport(
    supabase,
    reportId
  );

  return pending
    ? { pending, presetUnitId: pending.unitId, units }
    : null;
};
