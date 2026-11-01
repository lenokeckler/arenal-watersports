import { PATHS } from "@/app/constants";
import type { ReservationHistoryQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryQuery.interface";
import { RESERVATION_HISTORY_HREF } from "../constants/ReservationHistoryHref.constants";
import { buildReservationHistoryQueryString } from "./buildReservationHistoryQueryString";

export const buildReservationHistoryHref = (
  query: Pick<
    ReservationHistoryQuery,
    "filters" | "pageIndex"
  >
): string => {
  const queryString =
    buildReservationHistoryQueryString(query);

  return queryString === ""
    ? PATHS.HISTORY.ROOT
    : `${PATHS.HISTORY.ROOT}${RESERVATION_HISTORY_HREF.QUERY_PREFIX}${queryString}`;
};
