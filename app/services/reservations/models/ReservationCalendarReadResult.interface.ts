import type { ReservationCalendarQueryRow } from "./ReservationCalendarQueryRow.type";

export interface ReservationCalendarReadResult {
  rows: readonly ReservationCalendarQueryRow[];
  totalCount: number;
}
