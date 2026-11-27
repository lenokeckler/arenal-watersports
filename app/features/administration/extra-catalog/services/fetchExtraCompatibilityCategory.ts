import {
  INVENTORY_TRACKING_MODE,
  POSTGRES_ERROR_CODE,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  EXTRA_COMPATIBILITY_CATEGORY_COLUMNS,
  EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS,
} from "../constants/ExtraCompatibilityQuery.constants";
import type { ExtraCompatibilityCategoryRow } from "../models/ExtraCompatibilityCategoryRow.type";

export const fetchExtraCompatibilityCategory = async (
  supabase: ServerSupabaseClient,
  categoryId: string
): Promise<NullableRef<ExtraCompatibilityCategoryRow>> => {
  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select(EXTRA_COMPATIBILITY_CATEGORY_COLUMNS)
    .eq("id", categoryId)
    .eq("tracking_mode", INVENTORY_TRACKING_MODE.BY_UNIT)
    .order("code", EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(
    error,
    "fetchExtraCompatibilityCategory"
  );

  return categoryRow;
};
