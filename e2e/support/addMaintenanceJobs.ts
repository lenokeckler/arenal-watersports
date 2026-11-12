import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { E2E_MAINTENANCE_HISTORY_SEED } from "../constants/E2eMaintenanceHistory.constants";
import { failE2eOperation } from "./failE2eOperation";

export const addMaintenanceJobs = async (
  supabase: SupabaseClient,
  unitCodes: string[],
  workerId: string
): Promise<void> => {
  const [first, second] = unitCodes;
  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id, code")
    .in("code", [first, second]);

  if (units.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_ADD_JOBS,
      units.error.message
    );
  }

  const idOf = (code: string): string =>
    (units.data ?? []).find((unit) => unit.code === code)
      ?.id ?? "";
  const insert = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.MAINTENANCE_RECORDS)
    .insert([
      {
        cost_amount: 35000,
        cost_currency: "CRC",
        created_by: workerId,
        description:
          E2E_MAINTENANCE_HISTORY_SEED.DESCRIPTION,
        is_external: true,
        performed_at: "2026-09-06",
        unit_id: idOf(first),
        work_type: "part_change",
      },
      {
        created_by: workerId,
        is_external: false,
        performed_at: "2026-09-01",
        unit_id: idOf(second),
        work_type: "tire_change",
      },
    ]);

  if (insert.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_ADD_JOBS,
      insert.error.message
    );
  }

  return undefined;
};
