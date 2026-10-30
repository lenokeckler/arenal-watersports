import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import { mapCategoryRowToAlerts } from "../utils/mapCategoryRowToAlerts";

export const getCategoryAlerts = async (
  categoryId: string
): Promise<NullableRef<CategoryAlerts>> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select("id, alert_min_quantity, alert_expiry_days")
    .eq("id", categoryId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getCategoryAlerts");

  return categoryRow
    ? mapCategoryRowToAlerts(categoryRow)
    : null;
};
