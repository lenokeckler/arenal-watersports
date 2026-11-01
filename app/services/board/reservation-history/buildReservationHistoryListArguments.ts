import { PAGINATION } from "@/app/constants";
import type { ReservationHistoryListArguments } from "./models/ReservationHistoryListArguments.type";
import type { ReservationHistoryQuery } from "./models/ReservationHistoryQuery.interface";

export const buildReservationHistoryListArguments = ({
  filters,
  pageIndex,
}: Pick<
  ReservationHistoryQuery,
  "filters" | "pageIndex"
>): ReservationHistoryListArguments => ({
  p_page_index: pageIndex,
  p_page_size: PAGINATION.DEFAULT_PAGE_SIZE,
  ...(filters.categoryId === null
    ? {}
    : { p_category_id: filters.categoryId }),
  ...(filters.from === null
    ? {}
    : { p_from: filters.from }),
  ...(filters.to === null ? {} : { p_to: filters.to }),
  ...(filters.type === null
    ? {}
    : { p_type: filters.type }),
});
