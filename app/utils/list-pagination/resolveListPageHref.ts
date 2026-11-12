import { PAGINATION } from "@/app/constants";
import { LIST_PAGINATION } from "./constants/ListPagination.constants";

export const resolveListPageHref = (
  basePath: string,
  page: number
): string =>
  page === LIST_PAGINATION.FIRST_PAGE
    ? basePath
    : `${basePath}?${PAGINATION.QUERY_PARAMS.PAGE}=${page}`;
