import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { E2E_DAMAGE_REPORTS_SEED } from "../constants/E2eDamageReports.constants";
import { failE2eOperation } from "./failE2eOperation";

export const addDamageReports = async (
  supabase: SupabaseClient,
  unitCodes: string[],
  workerId: string
): Promise<string> => {
  const [first] = unitCodes;
  const unit = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id")
    .eq("code", first)
    .single();

  if (unit.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_ADD_REPORTS,
      unit.error.message
    );
  }

  const reports = [
    {
      cause: "collision",
      description:
        E2E_DAMAGE_REPORTS_SEED.COLLISION_DESCRIPTION,
      impact_delta: 1,
    },
    {
      cause: "rollover",
      description:
        E2E_DAMAGE_REPORTS_SEED.ROLLOVER_DESCRIPTION,
      impact_delta: 2,
    },
  ];

  for (const report of reports) {
    const insert = await supabase
      .from(E2E_DISPATCH_SHEET_TABLE.DAMAGE_REPORTS)
      .insert({
        ...report,
        created_by: workerId,
        unit_id: unit.data.id,
      });

    if (insert.error) {
      return failE2eOperation(
        E2E_DISPATCH_SHEET_ERROR.OPERATION_ADD_REPORTS,
        insert.error.message
      );
    }
  }

  return unit.data.id;
};
