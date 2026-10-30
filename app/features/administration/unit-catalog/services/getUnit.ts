import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { Unit } from "../models/Unit.interface";
import { mapUnitRowToUnit } from "../utils/mapUnitRowToUnit";

export const getUnit = async (
  unitId: string
): Promise<NullableRef<Unit>> => {
  const supabase = await createServerSupabaseClient();

  const { data: unitRow, error } = await supabase
    .from("equipment_units")
    .select(
      "id, category_id, code, status, fuel_max, fuel_level, usage_total, next_oil_change_at, decommissioned_at, decommission_reason"
    )
    .eq("id", unitId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getUnit");

  return unitRow ? mapUnitRowToUnit(unitRow) : null;
};
