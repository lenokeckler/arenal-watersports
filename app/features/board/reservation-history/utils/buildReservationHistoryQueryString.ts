import {
  PAGINATION,
  RESERVATION_HISTORY_FILTER_PARAM,
} from "@/app/constants";
import type { ReservationHistoryQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryQuery.interface";

export const buildReservationHistoryQueryString = ({
  filters,
  pageIndex,
}: Pick<
  ReservationHistoryQuery,
  "filters" | "pageIndex"
>): string => {
  const searchParams = new URLSearchParams();

  if (filters.from !== null) {
    searchParams.set(
      RESERVATION_HISTORY_FILTER_PARAM.FROM,
      filters.from
    );
  }

  if (filters.to !== null) {
    searchParams.set(
      RESERVATION_HISTORY_FILTER_PARAM.TO,
      filters.to
    );
  }

  if (filters.type !== null) {
    searchParams.set(
      RESERVATION_HISTORY_FILTER_PARAM.TYPE,
      filters.type
    );
  }

  if (filters.categoryId !== null) {
    searchParams.set(
      RESERVATION_HISTORY_FILTER_PARAM.CATEGORY,
      filters.categoryId
    );
  }

  if (pageIndex > PAGINATION.DEFAULT_PAGE) {
    searchParams.set(
      PAGINATION.QUERY_PARAMS.PAGE,
      String(pageIndex + PAGINATION.ONE_PAGE)
    );
  }

  return searchParams.toString();
};
