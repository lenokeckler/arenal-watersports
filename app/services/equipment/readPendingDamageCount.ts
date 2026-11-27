import {
  EQUIPMENT_QUERY,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { EquipmentSupabaseClient } from "./models/EquipmentSupabaseClient.type";

export const readPendingDamageCount = async (
  supabase: EquipmentSupabaseClient
): Promise<number> => {
  const { count, error } = await supabase
    .from(EQUIPMENT_QUERY.DAMAGE_TABLE)
    .select(EQUIPMENT_QUERY.PENDING_COUNT_COLUMNS, {
      count: "exact",
      head: true,
    })
    .eq("detail_pending", true)
    .neq(
      EQUIPMENT_QUERY.UNIT_STATUS_COLUMN,
      INVENTORY_UNIT_STATUS.DECOMMISSIONED
    );
  throwIfSupabaseError(
    error,
    EQUIPMENT_QUERY.COUNT_PENDING
  );

  return safeNumber(count);
};
