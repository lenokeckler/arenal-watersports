import { LENGTH } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";

export const resolveCategoryListPage = (
  pageParam: NullableUndefined<string | string[]>
): number => {
  const page = Number(
    Array.isArray(pageParam)
      ? pageParam[LENGTH.ZERO]
      : pageParam
  );

  return Number.isSafeInteger(page) &&
    page >= CATEGORY_LIST_PAGINATION.FIRST_PAGE
    ? page
    : CATEGORY_LIST_PAGINATION.FIRST_PAGE;
};
