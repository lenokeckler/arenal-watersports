import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ComboCategoryOption } from "../models/ComboCategoryOption.interface";
import { buildComboCategoryOptionsFilter } from "../utils/buildComboCategoryOptionsFilter";

export const listComboCategoryOptions = async (
  selectedCategoryIds: string[] = []
): Promise<ComboCategoryOption[]> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRows, error } = await supabase
    .from("equipment_categories")
    .select("id, name")
    .or(
      buildComboCategoryOptionsFilter(selectedCategoryIds)
    )
    .order("name", { ascending: true });
  throwIfSupabaseError(error, "listComboCategoryOptions");

  return categoryRows ?? [];
};
