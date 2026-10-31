import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchCategoryIdsWithRecords = async (
  supabase: ServerSupabaseClient
): Promise<Set<string>> => {
  const [unitsResult, stockResult] = await Promise.all([
    supabase.from("equipment_units").select("category_id"),
    supabase.from("equipment_stock").select("category_id"),
  ]);
  throwIfSupabaseError(
    unitsResult.error,
    "fetchCategoryIdsWithRecords.units"
  );
  throwIfSupabaseError(
    stockResult.error,
    "fetchCategoryIdsWithRecords.stock"
  );

  const unitCategoryIds = (unitsResult.data ?? []).map(
    (unitRow) => unitRow.category_id
  );
  const stockCategoryIds = (stockResult.data ?? []).map(
    (stockRow) => stockRow.category_id
  );

  return new Set([...unitCategoryIds, ...stockCategoryIds]);
};
