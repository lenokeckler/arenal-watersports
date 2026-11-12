import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { ListPageRange } from "@/app/utils/list-pagination/models/ListPageRange.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { UnitListRow } from "../models/UnitListRow.type";

export const fetchUnits = async (
  supabase: ServerSupabaseClient,
  categoryId: string,
  range: ListPageRange
): Promise<UnitListRow[]> => {
  const { data: unitRows, error } = await supabase
    .from("equipment_units")
    .select(
      "id, code, status, fuel_max, fuel_level, usage_total, next_oil_change_at"
    )
    .eq("category_id", categoryId)
    .order("code", { ascending: true })
    .range(range.from, range.to);
  throwIfSupabaseError(error, "fetchUnits");

  return unitRows ?? [];
};
