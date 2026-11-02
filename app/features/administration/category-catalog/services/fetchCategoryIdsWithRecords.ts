import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

const SINGLE_ROW_LIMIT = 1;

const fetchCategoryHasRecords = async (
  supabase: ServerSupabaseClient,
  categoryId: string
): Promise<boolean> => {
  const [unitsResult, stockResult] = await Promise.all([
    supabase
      .from("equipment_units")
      .select("category_id")
      .eq("category_id", categoryId)
      .limit(SINGLE_ROW_LIMIT),
    supabase
      .from("equipment_stock")
      .select("category_id")
      .eq("category_id", categoryId)
      .limit(SINGLE_ROW_LIMIT),
  ]);
  throwIfSupabaseError(
    unitsResult.error,
    "fetchCategoryIdsWithRecords.units"
  );
  throwIfSupabaseError(
    stockResult.error,
    "fetchCategoryIdsWithRecords.stock"
  );

  return (
    (unitsResult.data ?? []).length > LENGTH.ZERO ||
    (stockResult.data ?? []).length > LENGTH.ZERO
  );
};

export const fetchCategoryIdsWithRecords = async (
  supabase: ServerSupabaseClient,
  categoryIds: string[]
): Promise<Set<string>> => {
  const hasRecords = await Promise.all(
    categoryIds.map((categoryId) =>
      fetchCategoryHasRecords(supabase, categoryId)
    )
  );

  return new Set(
    categoryIds.filter(
      (_categoryId, index) => hasRecords[index]
    )
  );
};
