import { createServerSupabaseClient } from "@/app/services/supabase";
import type { CategoryListPage } from "../models/CategoryListPage.interface";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { fetchCategories } from "./fetchCategories";
import { fetchCategoryCount } from "./fetchCategoryCount";
import { fetchCategoryIdsWithRecords } from "./fetchCategoryIdsWithRecords";

export const listCategories = async (
  page: number
): Promise<CategoryListPage> => {
  const supabase = await createServerSupabaseClient();

  const pageCount = resolveListPageCount(
    await fetchCategoryCount(supabase)
  );

  if (page > pageCount) {
    return { categories: [], pageCount };
  }

  const categoryRows = await fetchCategories(
    supabase,
    resolveListPageRange(page)
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
