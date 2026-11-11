import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  UNIT_READINGS_ERROR,
  UNIT_READINGS_LIMITS,
} from "../constants/UnitReadings.constants";
import type { UnitReading } from "../models/UnitReading.interface";
import { mapUnitReading } from "../utils/mapUnitReading";

const UNIT_COLUMNS =
  "id, code, status, fuel_max, fuel_level, usage_total, impact_count, next_oil_change_at, category:equipment_categories!inner(name, usage_metric, has_motor)";

export const getMotorUnitReadings = async (): Promise<
  UnitReading[]
> => {
  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase
    .from("equipment_units")
    .select(UNIT_COLUMNS)
    .eq("category.has_motor", true)
    .neq("status", "decommissioned")
    .order("code")
    .limit(UNIT_READINGS_LIMITS.UNITS_MAX);
  throwIfSupabaseError(
    error,
    UNIT_READINGS_ERROR.LOAD_UNITS
  );

  return (data ?? []).map(mapUnitReading);
};

export const getMotorUnitReading = async (
  unitId: string
): Promise<UnitReading | null> => {
  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase
    .from("equipment_units")
    .select(UNIT_COLUMNS)
    .eq("id", unitId)
    .eq("category.has_motor", true)
    .neq("status", "decommissioned")
    .maybeSingle();
  throwIfSupabaseError(
    error,
    UNIT_READINGS_ERROR.LOAD_UNIT
  );

  return data ? mapUnitReading(data) : null;
};
