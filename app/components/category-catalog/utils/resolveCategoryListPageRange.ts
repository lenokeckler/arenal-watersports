import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import type { CategoryListPageRange } from "../models/CategoryListPageRange.interface";

export const resolveCategoryListPageRange = (
  page: number
): CategoryListPageRange => ({
  from:
    (page - CATEGORY_LIST_PAGINATION.FIRST_PAGE) *
    CATEGORY_LIST_PAGINATION.PAGE_SIZE,
  to:
    page * CATEGORY_LIST_PAGINATION.PAGE_SIZE -
    CATEGORY_LIST_PAGINATION.FIRST_PAGE,
});
