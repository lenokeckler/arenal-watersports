import { LIST_PAGINATION } from "./constants/ListPagination.constants";
import type { ListPageRange } from "./models/ListPageRange.interface";

export const resolveListPageRange = (
  page: number
): ListPageRange => ({
  from:
    (page - LIST_PAGINATION.FIRST_PAGE) *
    LIST_PAGINATION.PAGE_SIZE,
  to:
    page * LIST_PAGINATION.PAGE_SIZE -
    LIST_PAGINATION.FIRST_PAGE,
});
