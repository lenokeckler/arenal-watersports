import { LIST_PAGINATION } from "./constants/ListPagination.constants";

export const resolveListPageCount = (
  totalCount: number
): number =>
  Math.ceil(totalCount / LIST_PAGINATION.PAGE_SIZE);
