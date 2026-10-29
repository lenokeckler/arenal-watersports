import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarViewModel } from "../models/ReservationsCalendarViewModel.interface";
import { useReservationCalendarDayContent } from "./useReservationCalendarDayContent";
import { useReservationCalendarPeriodContent } from "./useReservationCalendarPeriodContent";

export const useReservationsCalendarViewModel = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>
): ReservationsCalendarViewModel => {
  const dayContent =
    useReservationCalendarDayContent(snapshot);
  const periodContent =
    useReservationCalendarPeriodContent(snapshot);
  return { dayContent, periodContent };
};
