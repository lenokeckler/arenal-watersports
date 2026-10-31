import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";

export const fetchCategories = async (
  supabase: ServerSupabaseClient
): Promise<EquipmentCategoryRow[]> => {
  const { data: categoryRows, error: categoryRowsError } =
    await supabase
      .from("equipment_categories")
      .select("*")
      .order("name", { ascending: true });
  throwIfSupabaseError(
    categoryRowsError,
    "fetchCategories"
  );

  return categoryRows ?? [];
};
