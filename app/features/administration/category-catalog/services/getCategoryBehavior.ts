import type { NullableRef } from "@/app/types";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { mapCategoryRowToBehavior } from "../utils/mapCategoryRowToBehavior";
import { readCategoryRow } from "./readCategoryRow";

export const getCategoryBehavior = (
  categoryId: string
): Promise<NullableRef<CategoryBehavior>> =>
  readCategoryRow({
    query: (supabase) =>
      supabase
        .from("equipment_categories")
        .select("*")
        .eq("id", categoryId)
        .maybeSingle(),
    map: mapCategoryRowToBehavior,
    operation: "getCategoryBehavior",
  });
