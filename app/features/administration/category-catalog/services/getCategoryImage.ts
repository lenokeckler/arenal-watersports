import type { NullableRef } from "@/app/types";
import type { CategoryImage } from "../models/CategoryImage.interface";
import { mapCategoryRowToImage } from "../utils/mapCategoryRowToImage";
import { readCategoryRow } from "./readCategoryRow";

export const getCategoryImage = (
  categoryId: string
): Promise<NullableRef<CategoryImage>> =>
  readCategoryRow({
    query: (supabase) =>
      supabase
        .from("equipment_categories")
        .select("id, name, image_path")
        .eq("id", categoryId)
        .maybeSingle(),
    map: mapCategoryRowToImage,
    operation: "getCategoryImage",
  });
