import { PATHS } from "@/app/constants";
import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";
import { RESERVATION_HISTORY_HREF } from "../constants/ReservationHistoryHref.constants";
import { buildReservationHistoryQueryString } from "./buildReservationHistoryQueryString";

export const buildReservationHistoryHref = (
  query: ReservationHistoryLinkQuery
): string => {
  const queryString =
    buildReservationHistoryQueryString(query);

  return queryString === ""
    ? PATHS.HISTORY.ROOT
    : `${PATHS.HISTORY.ROOT}${RESERVATION_HISTORY_HREF.QUERY_PREFIX}${queryString}`;
};
