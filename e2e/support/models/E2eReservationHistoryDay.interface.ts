import type { E2eReservationHistoryQuery } from "./E2eReservationHistoryQuery.type";

export interface E2eReservationHistoryDay {
  date: string;
  query: E2eReservationHistoryQuery;
  startsAt: string;
}
