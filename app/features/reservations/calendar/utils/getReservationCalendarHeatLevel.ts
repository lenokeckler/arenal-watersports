import { CALENDAR_HEAT_LEVEL } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarHeatLevel } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import { RESERVATION_CALENDAR_HEAT_MAP } from "../constants/ReservationCalendarHeatMap.constants";

export const getReservationCalendarHeatLevel = (
  reservationCount: number
): CalendarHeatLevel => {
  if (
    reservationCount <=
    RESERVATION_CALENDAR_HEAT_MAP.MAX_GREEN_RESERVATIONS
  ) {
    return CALENDAR_HEAT_LEVEL.GREEN;
  }
  if (
    reservationCount <=
    RESERVATION_CALENDAR_HEAT_MAP.MAX_ORANGE_RESERVATIONS
  ) {
    return CALENDAR_HEAT_LEVEL.ORANGE;
  }
  return CALENDAR_HEAT_LEVEL.RED;
};
