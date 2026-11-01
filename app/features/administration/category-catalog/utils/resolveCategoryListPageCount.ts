import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";

export const resolveCategoryListPageCount = (
  totalCount: number
): number =>
  Math.ceil(
    totalCount / CATEGORY_LIST_PAGINATION.PAGE_SIZE
  );
