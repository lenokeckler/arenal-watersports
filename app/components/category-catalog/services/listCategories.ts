import { createServerSupabaseClient } from "@/app/services/supabase";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { fetchCategories } from "./fetchCategories";
import { fetchCategoryIdsWithRecords } from "./fetchCategoryIdsWithRecords";

export const listCategories = async (): Promise<
  CategoryListItem[]
> => {
  const supabase = await createServerSupabaseClient();

  const [categoryRows, categoryIdsWithRecords] =
    await Promise.all([
      fetchCategories(supabase),
      fetchCategoryIdsWithRecords(supabase),
    ]);

  return categoryRows.map((categoryRow) =>
    mapCategoryRowToListItem(
      categoryRow,
      categoryIdsWithRecords
    )
  );
};
