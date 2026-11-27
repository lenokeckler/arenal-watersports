import {
  EQUIPMENT_QUERY,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapEquipmentReport } from "./mapEquipmentReport";
import type { EquipmentReport } from "./models/EquipmentReport.interface";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";

export const readPendingEquipmentReports = async (
  supabase: EquipmentSupabaseClient
): Promise<EquipmentReport[]> => {
  const { data, error } = await supabase
    .from(EQUIPMENT_QUERY.DAMAGE_TABLE)
    .select(EQUIPMENT_QUERY.DAMAGE_COLUMNS)
    .eq("detail_pending", true)
    .neq(
      EQUIPMENT_QUERY.UNIT_STATUS_COLUMN,
      INVENTORY_UNIT_STATUS.DECOMMISSIONED
    )
    .order("created_at", { ascending: false });
  throwIfSupabaseError(error, EQUIPMENT_QUERY.LOAD_DAMAGE);

  return (data ?? []).map(mapEquipmentReport);
};
