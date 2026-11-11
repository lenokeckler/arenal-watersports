import { LIST_PAGINATION } from "./constants/ListPagination.constants";

export const resolveListPageCount = (
  totalCount: number,
  pageSize: number = LIST_PAGINATION.PAGE_SIZE
): number => Math.ceil(totalCount / pageSize);
