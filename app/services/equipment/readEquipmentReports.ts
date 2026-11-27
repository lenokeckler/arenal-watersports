import {
  COSTA_RICA_UTC_OFFSET,
  EQUIPMENT_QUERY,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapEquipmentReport } from "./mapEquipmentReport";
import type { EquipmentRecordFilter } from "./models/EquipmentRecordFilter.interface";
import type { EquipmentReport } from "./models/EquipmentReport.interface";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";

const MIDNIGHT = "T00:00:00";

export const readEquipmentReports = async (
  supabase: EquipmentSupabaseClient,
  { before, since, unitId }: EquipmentRecordFilter = {}
): Promise<EquipmentReport[]> => {
  let query = supabase
    .from(EQUIPMENT_QUERY.DAMAGE_TABLE)
    .select(EQUIPMENT_QUERY.DAMAGE_COLUMNS)
    .order("created_at", { ascending: false });

  if (since) {
    query = query.gte(
      "created_at",
      `${since}${MIDNIGHT}${COSTA_RICA_UTC_OFFSET}`
    );
  }

  if (before) {
    query = query.lt(
      "created_at",
      `${before}${MIDNIGHT}${COSTA_RICA_UTC_OFFSET}`
    );
  }

  if (unitId) {
    query = query.eq("unit_id", unitId);
  }

  const { data, error } = await query;
  throwIfSupabaseError(error, EQUIPMENT_QUERY.LOAD_DAMAGE);

  return (data ?? []).map(mapEquipmentReport);
};
