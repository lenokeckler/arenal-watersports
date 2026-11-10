import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { useCalendarSnapshot } from "@/app/components/reservation-calendar/hooks/useCalendarSnapshot";
import { readOperationsCalendarPeriod } from "../actions/readOperationsCalendarPeriod";

export const useOperationsCalendarSnapshot = (
  initialSnapshot: ReservationCalendarSnapshot
) =>
  useCalendarSnapshot(
    initialSnapshot,
    readOperationsCalendarPeriod
  );
