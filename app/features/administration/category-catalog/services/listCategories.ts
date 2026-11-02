import { createServerSupabaseClient } from "@/app/services/supabase";
import type { CategoryListPage } from "../models/CategoryListPage.interface";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { fetchCategories } from "./fetchCategories";
import { fetchCategoryCount } from "./fetchCategoryCount";
import { fetchCategoryIdsWithRecords } from "./fetchCategoryIdsWithRecords";
import { fetchCategoryQuantities } from "./fetchCategoryQuantities";

export const listCategories = async (
  page: number
): Promise<CategoryListPage> => {
  const supabase = await createServerSupabaseClient();

  const totalCount = await fetchCategoryCount(supabase);
  const pageCount = resolveListPageCount(
    totalCount,
    CATEGORY_LIST_PAGINATION.PAGE_SIZE
  );

  if (page > pageCount) {
    return { categories: [], pageCount, totalCount };
  }

  const categoryRows = await fetchCategories(
    supabase,
    resolveListPageRange(
      page,
      CATEGORY_LIST_PAGINATION.PAGE_SIZE
    )
  );
  const categoryIds = categoryRows.map(
    (categoryRow) => categoryRow.id
  );
  const [categoryIdsWithRecords, quantityByCategoryId] =
    await Promise.all([
      fetchCategoryIdsWithRecords(supabase, categoryIds),
      fetchCategoryQuantities(supabase, categoryIds),
    ]);

  return {
    categories: categoryRows.map((categoryRow) =>
      mapCategoryRowToListItem(categoryRow, {
        categoryIdsWithRecords,
        quantityByCategoryId,
      })
    ),
    pageCount,
    totalCount,
  };
};
