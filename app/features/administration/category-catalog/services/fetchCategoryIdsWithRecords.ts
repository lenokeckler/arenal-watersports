import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchCategoryIdsWithRecords = async (
  supabase: ServerSupabaseClient,
  categoryIds: string[]
): Promise<Set<string>> => {
  if (categoryIds.length === LENGTH.ZERO) {
    return new Set();
  }

  const [unitsResult, stockResult] = await Promise.all([
    supabase
      .from("equipment_units")
      .select("category_id")
      .in("category_id", categoryIds),
    supabase
      .from("equipment_stock")
      .select("category_id")
      .in("category_id", categoryIds),
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
