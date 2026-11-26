import { LENGTH } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";
import { mapCategoryRowToConfiguration } from "../utils/mapCategoryRowToConfiguration";
import { fetchCategoryQuantities } from "./fetchCategoryQuantities";
import { readCategoryRow } from "./readCategoryRow";

export const getCategoryConfiguration = async (
  categoryId: string
): Promise<NullableRef<CategoryConfiguration>> => {
  const categoryRow = await readCategoryRow<
    EquipmentCategoryRow,
    EquipmentCategoryRow
  >({
    query: (supabase) =>
      supabase
        .from("equipment_categories")
        .select("*")
        .eq("id", categoryId)
        .maybeSingle(),
    map: (row) => row,
    operation: "getCategoryConfiguration",
  });

  if (!categoryRow) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const quantityByCategoryId =
    await fetchCategoryQuantities(supabase, [
      categoryRow.id,
    ]);

  return mapCategoryRowToConfiguration(
    categoryRow,
    quantityByCategoryId.get(categoryRow.id) ?? LENGTH.ZERO
  );
};
