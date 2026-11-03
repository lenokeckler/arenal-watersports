import type {
  DepositListItem,
  DepositsPage,
} from "@/app/services/deposits";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";

export const createDepositsPage = (
  items: DepositListItem[]
): DepositsPage<DepositListItem> => ({
  items,
  page: LIST_PAGINATION.FIRST_PAGE,
  pageCount: LIST_PAGINATION.FIRST_PAGE,
  totalCount: items.length,
});
