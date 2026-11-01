import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { mapCategoryRowToBehavior } from "../utils/mapCategoryRowToBehavior";

export const getCategoryBehavior = async (
  categoryId: string
): Promise<NullableRef<CategoryBehavior>> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select("*")
    .eq("id", categoryId)
    .maybeSingle();
  throwIfSupabaseError(error, "getCategoryBehavior");

  return categoryRow
    ? mapCategoryRowToBehavior(categoryRow)
    : null;
};
