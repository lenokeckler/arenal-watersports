import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { UnitCategory } from "../models/UnitCategory.interface";
import { mapUnitCategoryRowToCategory } from "../utils/mapUnitCategoryRowToCategory";

export const getUnitCategory = async (
  categoryId: string
): Promise<NullableRef<UnitCategory>> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select(
      "id, name, tracking_mode, has_motor, usage_metric"
    )
    .eq("id", categoryId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getUnitCategory");

  return categoryRow
    ? mapUnitCategoryRowToCategory(categoryRow)
    : null;
};
