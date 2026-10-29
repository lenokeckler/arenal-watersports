import { createServerSupabaseClient } from "@/app/services/supabase";
import type { CategoryListPage } from "../models/CategoryListPage.interface";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { resolveCategoryListPageCount } from "../utils/resolveCategoryListPageCount";
import { resolveCategoryListPageRange } from "../utils/resolveCategoryListPageRange";
import { fetchCategories } from "./fetchCategories";
import { fetchCategoryIdsWithRecords } from "./fetchCategoryIdsWithRecords";

export const listCategories = async (
  page: number
): Promise<CategoryListPage> => {
  const supabase = await createServerSupabaseClient();

  const { rows, totalCount } = await fetchCategories(
    supabase,
    resolveCategoryListPageRange(page)
  );
  const categoryIdsWithRecords =
    await fetchCategoryIdsWithRecords(
      supabase,
      rows.map((categoryRow) => categoryRow.id)
    );

  return {
    categories: rows.map((categoryRow) =>
      mapCategoryRowToListItem(
        categoryRow,
        categoryIdsWithRecords
      )
    ),
    pageCount: resolveCategoryListPageCount(totalCount),
  };
};
