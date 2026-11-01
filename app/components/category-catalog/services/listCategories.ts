import { createServerSupabaseClient } from "@/app/services/supabase";
import type { CategoryListPage } from "../models/CategoryListPage.interface";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { resolveCategoryListPageCount } from "../utils/resolveCategoryListPageCount";
import { resolveCategoryListPageRange } from "../utils/resolveCategoryListPageRange";
import { fetchCategories } from "./fetchCategories";
import { fetchCategoryCount } from "./fetchCategoryCount";
import { fetchCategoryIdsWithRecords } from "./fetchCategoryIdsWithRecords";

export const listCategories = async (
  page: number
): Promise<CategoryListPage> => {
  const supabase = await createServerSupabaseClient();

  const pageCount = resolveCategoryListPageCount(
    await fetchCategoryCount(supabase)
  );

  if (page > pageCount) {
    return { categories: [], pageCount };
  }

  const categoryRows = await fetchCategories(
    supabase,
    resolveCategoryListPageRange(page)
  );
  const categoryIdsWithRecords =
    await fetchCategoryIdsWithRecords(
      supabase,
      categoryRows.map((categoryRow) => categoryRow.id)
    );

  return {
    categories: categoryRows.map((categoryRow) =>
      mapCategoryRowToListItem(
        categoryRow,
        categoryIdsWithRecords
      )
    ),
    pageCount,
  };
};
