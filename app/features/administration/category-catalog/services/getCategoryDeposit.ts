import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import { mapCategoryRowToDeposit } from "../utils/mapCategoryRowToDeposit";

export const getCategoryDeposit = async (
  categoryId: string
): Promise<NullableRef<CategoryDeposit>> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select("id, deposit_usd, deposit_crc")
    .eq("id", categoryId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getCategoryDeposit");

  return categoryRow
    ? mapCategoryRowToDeposit(categoryRow)
    : null;
};
