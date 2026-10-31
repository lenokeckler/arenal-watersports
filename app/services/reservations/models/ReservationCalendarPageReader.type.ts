import type { ReservationCalendarQueryPage } from "./ReservationCalendarQueryPage.interface";

export type ReservationCalendarPageReader = (
  page: number
) => Promise<ReservationCalendarQueryPage>;
