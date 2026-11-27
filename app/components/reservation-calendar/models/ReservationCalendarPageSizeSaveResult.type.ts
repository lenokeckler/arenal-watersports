import type { ReservationCalendarPageSize } from "./ReservationCalendarPageSize.type";

export type ReservationCalendarPageSizeSaveResult =
  | { kind: "saved"; pageSize: ReservationCalendarPageSize }
  | { kind: "failed" };
