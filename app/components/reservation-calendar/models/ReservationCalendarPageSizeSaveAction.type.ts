import type { ReservationCalendarPageSize } from "./ReservationCalendarPageSize.type";
import type { ReservationCalendarPageSizeSaveResult } from "./ReservationCalendarPageSizeSaveResult.type";

export type ReservationCalendarPageSizeSaveAction = (
  pageSize: ReservationCalendarPageSize
) => Promise<ReservationCalendarPageSizeSaveResult>;
