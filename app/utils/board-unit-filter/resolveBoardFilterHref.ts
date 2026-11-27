import {
  BOARD_UNIT_FILTER,
  BOARD_UNIT_FILTER_QUERY_PARAM,
  PAGINATION,
  type BoardUnitFilter,
} from "@/app/constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";

export const resolveBoardFilterHref = (
  basePath: string,
  filter: BoardUnitFilter,
  page: number = LIST_PAGINATION.FIRST_PAGE
): string => {
  const params = new URLSearchParams();

  if (filter !== BOARD_UNIT_FILTER.ALL) {
    params.set(BOARD_UNIT_FILTER_QUERY_PARAM, filter);
  }

  if (page !== LIST_PAGINATION.FIRST_PAGE) {
    params.set(PAGINATION.QUERY_PARAMS.PAGE, String(page));
  }

  const query = params.toString();

  return query ? `${basePath}?${query}` : basePath;
};
