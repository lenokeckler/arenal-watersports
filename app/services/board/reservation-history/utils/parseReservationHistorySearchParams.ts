import {
  PAGINATION,
  RESERVATION_HISTORY_FILTER_PARAM,
} from "@/app/constants";
import type { ReservationHistoryQuery } from "../models/ReservationHistoryQuery.interface";
import type { ReservationHistorySearchParams } from "../models/ReservationHistorySearchParams.type";
import { parseReservationHistoryCategory } from "./parseReservationHistoryCategory";
import { parseReservationHistoryDate } from "./parseReservationHistoryDate";
import { parseReservationHistoryType } from "./parseReservationHistoryType";
import { resolveReservationHistoryPageIndex } from "./resolveReservationHistoryPageIndex";

export const parseReservationHistorySearchParams = (
  searchParams: ReservationHistorySearchParams
): ReservationHistoryQuery => {
  const from = parseReservationHistoryDate(
    searchParams[RESERVATION_HISTORY_FILTER_PARAM.FROM]
  );
  const to = parseReservationHistoryDate(
    searchParams[RESERVATION_HISTORY_FILTER_PARAM.TO]
  );

  return {
    filters: {
      categoryId: parseReservationHistoryCategory(
        searchParams[
          RESERVATION_HISTORY_FILTER_PARAM.CATEGORY
        ]
      ),
      from,
      to,
      type: parseReservationHistoryType(
        searchParams[RESERVATION_HISTORY_FILTER_PARAM.TYPE]
      ),
    },
    hasInvertedDateRange:
      from !== null && to !== null && from > to,
    pageIndex: resolveReservationHistoryPageIndex(
      searchParams[PAGINATION.QUERY_PARAMS.PAGE]
    ),
  };
};
