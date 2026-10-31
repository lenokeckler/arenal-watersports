import { LENGTH } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { LIST_PAGINATION } from "./constants/ListPagination.constants";

export const resolveListPage = (
  pageParam: NullableUndefined<string | string[]>
): number => {
  const page = Number(
    Array.isArray(pageParam)
      ? pageParam[LENGTH.ZERO]
      : pageParam
  );

  return Number.isSafeInteger(page) &&
    page >= LIST_PAGINATION.FIRST_PAGE
    ? page
    : LIST_PAGINATION.FIRST_PAGE;
};
