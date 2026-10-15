import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarViewModel } from "../models/ReservationsCalendarViewModel.interface";
import { useReservationCalendarDayContent } from "@/app/components/reservation-calendar/hooks/useReservationCalendarDayContent";
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
