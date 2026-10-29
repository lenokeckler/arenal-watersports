import { CALENDAR_WORK_AREA } from "@/app/constants";
import { getAllowedCalendarViews } from "@/app/utils/calendar/getAllowedCalendarViews";
import { useReservationCalendarDayContent } from "@/app/components/reservation-calendar/hooks/useReservationCalendarDayContent";
import type { OperationsCalendarProps } from "../models/OperationsCalendarProps.interface";
import type { OperationsCalendarViewModel } from "../models/OperationsCalendarViewModel.interface";

export const useOperationsCalendarViewModel = ({
  snapshot,
}: OperationsCalendarProps): OperationsCalendarViewModel => ({
  allowedViews: getAllowedCalendarViews(
    CALENDAR_WORK_AREA.OPERATIONS
  ),
  dayContent: useReservationCalendarDayContent(
    snapshot,
    true
  ),
});
