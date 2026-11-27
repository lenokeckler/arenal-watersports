import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  EXTRA_COMPATIBILITY_CATEGORY_COLUMNS,
  EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS,
} from "../constants/ExtraCompatibilityQuery.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { ExtraCompatibilityCategoryRow } from "../models/ExtraCompatibilityCategoryRow.type";

export const fetchExtraCompatibilityCategories = async (
  supabase: ServerSupabaseClient
): Promise<ExtraCompatibilityCategoryRow[]> => {
  const { data: categoryRows, error } = await supabase
    .from("equipment_categories")
    .select(EXTRA_COMPATIBILITY_CATEGORY_COLUMNS)
    .eq("tracking_mode", INVENTORY_TRACKING_MODE.BY_UNIT)
    .eq("status", EXTRA_STATUS.ACTIVE)
    .order("name", { ascending: true })
    .order("code", EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS);
  throwIfSupabaseError(
    error,
    "fetchExtraCompatibilityCategories"
  );

  return categoryRows ?? [];
};
