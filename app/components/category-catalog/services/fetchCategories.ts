import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryListPageRange } from "../models/CategoryListPageRange.interface";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";

export const fetchCategories = async (
  supabase: ServerSupabaseClient,
  range: CategoryListPageRange
): Promise<EquipmentCategoryRow[]> => {
  const { data: categoryRows, error: categoryRowsError } =
    await supabase
      .from("equipment_categories")
      .select("*")
      .order("name", { ascending: true })
      .range(range.from, range.to);
  throwIfSupabaseError(
    categoryRowsError,
    "fetchCategories"
  );

  return categoryRows ?? [];
};
