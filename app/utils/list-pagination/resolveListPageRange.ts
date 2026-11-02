import { LIST_PAGINATION } from "./constants/ListPagination.constants";
import type { ListPageRange } from "./models/ListPageRange.interface";

export const resolveListPageRange = (
  page: number,
  pageSize: number = LIST_PAGINATION.PAGE_SIZE
): ListPageRange => ({
  from: (page - LIST_PAGINATION.FIRST_PAGE) * pageSize,
  to: page * pageSize - LIST_PAGINATION.FIRST_PAGE,
});
