import { PAGINATION } from "@/app/constants";
import { mapReservationHistoryItem } from "./mapReservationHistoryItem";
import type { ReservationHistoryListRow } from "./models/ReservationHistoryListRow.type";
import type { ReservationHistoryPage } from "./models/ReservationHistoryPage.interface";

export const buildReservationHistoryPage = (
  rows: readonly ReservationHistoryListRow[]
): ReservationHistoryPage => {
  const [firstRow] = rows;
  if (firstRow === undefined) {
    return {
      items: [],
      pageCount: PAGINATION.ONE_PAGE,
      pageIndex: PAGINATION.DEFAULT_PAGE,
      totalCount: PAGINATION.ZERO_RESULTS,
    };
  }
  return {
    items: rows.map(mapReservationHistoryItem),
    pageCount: Math.max(
      PAGINATION.ONE_PAGE,
      Math.ceil(
        firstRow.total_count / PAGINATION.DEFAULT_PAGE_SIZE
      )
    ),
    pageIndex: firstRow.page_index,
    totalCount: firstRow.total_count,
  };
};
