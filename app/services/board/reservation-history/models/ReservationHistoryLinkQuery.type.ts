import type { ReservationHistoryQuery } from "./ReservationHistoryQuery.interface";

export type ReservationHistoryLinkQuery = Pick<
  ReservationHistoryQuery,
  "filters" | "pageIndex"
>;
