import { PATHS } from "@/app/constants";
import type { ReservationHistoryLinkQuery } from "@/app/services/board/reservation-history/models/ReservationHistoryLinkQuery.type";
import { RESERVATION_HISTORY_HREF } from "../constants/ReservationHistoryHref.constants";
import { buildReservationHistoryQueryString } from "./buildReservationHistoryQueryString";

export const buildReservationHistoryRecordHref = (
  reservationId: string,
  query: ReservationHistoryLinkQuery
): string => {
  const queryString =
    buildReservationHistoryQueryString(query);
  const recordPath = `${PATHS.HISTORY.ROOT}${RESERVATION_HISTORY_HREF.PATH_SEPARATOR}${reservationId}`;

  return queryString === ""
    ? recordPath
    : `${recordPath}${RESERVATION_HISTORY_HREF.QUERY_PREFIX}${queryString}`;
};
