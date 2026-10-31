import { PAGINATION, PATHS } from "@/app/constants";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";

export const resolveCategoryListPageHref = (
  page: number
): string =>
  page === CATEGORY_LIST_PAGINATION.FIRST_PAGE
    ? PATHS.ADMINISTRATION.CATEGORIES
    : `${PATHS.ADMINISTRATION.CATEGORIES}?${PAGINATION.QUERY_PARAMS.PAGE}=${page}`;
